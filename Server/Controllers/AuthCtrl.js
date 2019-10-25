const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const { PASSWORD, EMAIL} = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
})

module.exports = {
  checkForUser: async (req, res) => {
    if(req.session.user){
      const db = req.app.get('db')
      let catches = await db.get_catches([req.session.user.user_id])
      if(!catches){
        return res.status(200).send({})
      }
      res.status(200).send({
        catches: catches? catches: [],
        user: req.session.user
      })
    }
  },

  register: async (req, res) => {
    const { state, userName, email } = req.body
    let tempPass = Math.random().toString(15).slice(-10)
    const db = req.app.get('db')
    const checkEmail = await db.check_email([email])
    if(checkEmail[0]){
      return res.status(200).send({message: 'Email Already In Use!'})
    }
    const userArr = await db.find_user([userName])
    if(userArr[0]){
      return res.status(200).send({message: 'Username Taken!'})
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(tempPass, salt)
    const newUserArr = await db.register_user([state, userName, email, hash])
    delete newUserArr[0].hash
    let mailOption = {
      from: EMAIL,
      to: email,
      subject: 'temporary password',
      text: `Username: ${userName} temporary password: ${tempPass}.
        Instructions: 
          sign in using your temperary password. 
          click on your username in the top left corner. 
          click settings. 
          enter temperary password.
          enter new password and verify.
          click update password.`
    }  
    transporter.sendMail(mailOption, (err)=>{
      if(err) {
        return res.status(200).send({message: 'Invalid Email try again'})
      }
    })
    res.sendStatus(200)
  },

  login: async (req, res) => {
    const { userName, password} = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user([userName])
    if(!userArr[0]){
      return res.status(200).send({message: 'Invalid Username!'})
    }
     const result = await bcrypt.compareSync(password, userArr[0].hash)
    if(!result) {
      return res.status(200).send({message: 'Incorrect Password!'})
    }
    delete userArr[0].hash
    req.session.user = userArr[0]
    const catches = await db.get_catches([userArr[0].user_id])
    if(!catches){
      return res.status(200).send({message: 'problem getting catches'})
    }
    res.status(200).send({
      message: 'logged in',
      userData: req.session.user,
      loggedIn: true,
      catches: catches
    })
  },

  logout: async (req, res) => {
    req.session.destroy()
    res.status(200).send({})
  },

  checkPass: async (req, res) => {
    const { userName, pass } = req.body
    const db = req.app.get('db')
    const hashArr = await db.check_pass([userName])
    const result = await bcrypt.compareSync(pass, hashArr[0].hash)
    if(!result){
      return res.status(200).send({})
    }
    delete hashArr[0]
    res.status(200).send({message: 'Password Correct'})
  },

  updateUser: async (req, res) => {
    const { id } = req.params
    const { homeSt, userName, newEmail } = req.body
    const db = req.app.get('db')
    const { user_name, email } = req.session.user
    if(user_name !== userName){
      const checkUsername = await db.find_user(userName)
      if(checkUsername[0]){
        delete checkUsername[0]
        return res.status(200).send({message: 'Username Taken!'})
      }
    }
    if(email !== newEmail){
      const checkEmail = await db.check_email(newEmail)
      if(checkEmail[0]){
        delete checkEmail[0]
        return res.status(200).send({message: 'Email already in use!'})
      }
    }
    const userArr = await db.update_user([id, homeSt, userName, newEmail])
    if(userArr[0]){
      delete userArr[0].hash
      return res.status(200).send(userArr[0])
    }
  },

  updatePass: async (req, res) => {
    const { id } = req.params
    const { pass } = req.body
    const db = req.app.get('db')
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    const result = await db.update_password([id, hash])
    if(result){
      return res.status(200).send({message: 'Password updated'})
    }
  },

  forgotPass: async(req, res) => {
    const { email } = req.body
    let tempPass = Math.random().toString(15).slice(-10)
    const db = await req.app.get('db')
    const userArr = await db.check_email([email])
    if(!userArr[0]){
      return res.status(200).send({message: 'Invalid Email'})
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(tempPass, salt)
    const setPass = await db.update_password([userArr[0].user_id, hash])
    if(setPass){
      let mailOption = {
        from: EMAIL,
        to: email,
        subject: 'temporary password',
        text: `your temporary password is ${tempPass}.
          Instructions, 
          sign in using your temperary password. 
          click on your username in the top left corner. 
          click settings. 
          enter temperary password.
          enter new password and verify.
          click update password.`
      }  
      transporter.sendMail(mailOption, (err)=>{
        if(err) {
          return res.status(200).send({message: 'Invalid Email try again'})
        }
      })
    }
    res.sendStatus(200)
  },

  deleteAccount: async(req, res) => {
    const { id } = req.params
    const db = req.app.get('db')
    const result = await db.delete_account([id])
    if(result){
      req.session.destroy()
      res.status(200).send({message: 'Account Deleted'})
    }
  }
}