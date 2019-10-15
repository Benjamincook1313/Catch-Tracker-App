const bcrypt = require('bcryptjs');
const Swal = require('sweetalert2');

module.exports = {

  checkForUser: async (req, res) => {
    if(req.session.user){
      const db = req.app.get('db')
      let catches = await db.get_user_catches(req.session.user.user_name)
      res.status(200).send({
        catches: catches,
        user: req.session.user
      })
    }
  },

  register: async (req, res) => {
    const { State, UserName, Email, Password } = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user([UserName])
    if(userArr[0]){
      Swal.fire({title: 'User already exists please sign in}', showConfirmButton: false, type: 'warning', timer: 3000})
      return res.status(400).send({message: 'User Already exists'})
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(Password, salt)
    let newUserArr = await db.register_user([State, UserName, Email, hash])
    req.session.user = {
      state: newUserArr[0].state,
      username: newUserArr[0].user_name, 
      email: newUserArr[0].email
    }
    res.status(200).send({
      message: 'logged in',
      userData: req.session.user,
      loggedIn: true
    })
  },

  login: async (req, res) => {
    const {UserName, Password} = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user([UserName])
    if(userArr.length === 0){
      Swal.fire({title: 'user not found please register', showConfirmButton: false, timer: 3000})
      return res.status(401).send({message: 'Username not found'})
    }
    const result = await bcrypt.compareSync(Password, userArr[0].hash)
    if(!result) {
      Swal.fire({title: 'incorrect password'})
      return res.status(401).send({message: 'Incorrect password'})
    }
    req.session.user = userArr[0]
    delete req.session.user.hash
    const catches = await db.get_user_catches([req.session.user.user_name])
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
}