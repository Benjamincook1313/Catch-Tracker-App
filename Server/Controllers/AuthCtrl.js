const bcrypt = require('bcryptjs');

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
    const { state, userName, email, password } = req.body
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
    const hash = bcrypt.hashSync(password, salt)
    let newUserArr = await db.register_user([state, userName, email, hash])
    delete newUserArr[0].hash
    req.session.user = newUserArr[0]
    res.status(200).send({
      message: 'logged in',
      userData: req.session.user,
      loggedIn: true
    })
  },

  login: async (req, res) => {
    const { userName, password } = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user([userName])
    if(userArr.length === 0){
      return res.status(200).send({message: 'Invalid Username!'})
    }
    const result = await bcrypt.compareSync(password, userArr[0].hash)
    if(!result) {
      return res.status(200).send({message: 'Incorrect Password!'})
    }
    delete userArr[0].hash
    req.session.user = userArr[0]
    const catches = await db.get_catches([req.session.user.user_id])
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
    const { User, pass } = req.body
    const db = req.app.get('db')
    const hashArr = await db.check_pass([User.user_name])
    const result = await bcrypt.compareSync(pass, hashArr[0].hash)
    if(!result){
      return res.status(401).send({})
    }
    res.status(200).send({message: 'Password Correct'})
  },

  updateUser: async (req, res) => {
    const { id } = req.params
    const { state, name, email } = req.body
    const db = req.app.get('db')
    if(req.session.user.user_name !== name){
      const checkUsername = db.find_user(name)
      if(checkUsername[0]){
        return res.status(200).send({message: 'Username Taken'})
      }
    }
    const userArr = db.update_user([id, state, name, email])
    delete userArr[0].hash
    console.log(userArr[0])
    res.status(200).send(userArr[0])
  },

  updatePassword: async (req, res) => {
    const { pass } = req.body
    const db = req.app.get('db')
    const salt = bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(pass, salt)
    await db.update_password([hash])
    res.status(200).send({message: 'update success'})
  }
}