
module.exports = {
  getCatches: async (req, res) => {
    const username = req.session.user.user_name
    const db = req.app.get('db')
    const data = await db.get_user_catches(username)
    res.status(200).send(data)
  },

  saveCatch: (req, res) => {
    const {userName, date, TOD, Location, weather, ImageName, Fish, Fly } = req.body
    const db = req.app.get('db')
    db.save_catch([userName, date, TOD, Location, weather, ImageName, Fish, Fly])
    res.status(200).send({message: 'catch saved'})
  }
}