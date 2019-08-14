const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user([Email])
    if(userArr[0]){
      return res.status(400).send({message: 'User Already exists'})
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(Password, salt)
    let newUserArr = await db.register_user([FirstName, LastName, Email, hash])
    req.session.user = {id: newUserArr[0].user_id, FirstName: newUserArr[0].firstname, LastName: newUserArr[0].lastname, Email: newUserArr[0].email}
    res.status(200).send({
      message: 'logged in',
      userData: req.session.user,
      loggedIn: true
    })
  },

  login: async (req, res) => {
    const {Email, Password} = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user([Email])
    if(userArr.length === 0){
      return res.status(401).send({message: 'Username not found'})
    }
    const result = bcrypt.compareSync(Password, userArr[0].hash)
    if(!result) {
      return res.status(401).send({message: 'Incorrect password'})
    }
    req.session.user = userArr[0]
    delete req.session.user.hash
    res.status(200).send({
      message: 'logged in',
      userData: req.session.user,
      loggedIn: true
    })
  }
}