
module.exports = {
  getCatches: async (req, res) => {
    if(req.session.user){
      const username = req.session.user.user_name
      const db = req.app.get('db')
      const data = await db.get_user_catches(username)
      res.status(200).send(data)
    }
  },

  saveCatch: async (req, res) => {
    const { user, day, tod, waterName, waterType, usState, temp, weather, image, 
      length, species, fishType, size, fly, flyType, color, details } = req.body
    const user_name = user.user_name
    const db = req.app.get('db')
    const data = await db.save_catch([user_name, day, tod, waterName, waterType, usState, temp, 
      weather, image, length, species, fishType, size, fly, flyType, color, details])
    res.status(200).send(data)
  },

  updateCatch: async (req, res) => {
    const {id} = req.params
    const { user, day, tod, waterName, waterType, usState, temp, weather, image, 
      length, species, fishType, size, fly, flyType, color, details } = req.body
    const user_name = `${user.user_name}`
    const db = req.app.get('db')
    const data = await db.update_catch([
      id, user_name, day, tod, waterName, waterType, 
      usState, temp, weather, image, length, species, fishType, size, fly, 
      flyType, color, details
    ]).catch(err => {err, console.log(err)})
    res.status(200).send(data)
  },

  deleteCatch: async (req, res) => {
    const {id} = req.params
    // const user_name = req.body.user.user_name
    const db = req.app.get('db')
    const data = await db.delete_catch(id)
    .catch(err => {err, console.log(err)})
    res.status(200).send(data)
  }
}