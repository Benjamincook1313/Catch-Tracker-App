const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

app.use(fileUpload())

module.exports = {
  
  checkForUser: (req, res) => {
    res.status(200).send(req.session.user)
  },

  upload: (req, res) => {
    console.log(req.files)
    // const uploads = req.app.post('public/uploads', {Image})
  },

  saveCatch: (req, res) => {

  }
}