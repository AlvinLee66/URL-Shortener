const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenSchema = new Schema({
  url: { // 原來的網址
    type: String, 
    required: true
  },
  shorten: { // 縮短的網址
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Shorten', shortenSchema)