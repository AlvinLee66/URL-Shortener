const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenSchema = new Schema({
  url: { type: String, required: true }, // 原來的網址
  shortenCode: { type: String, required: true } // 縮短的編碼
})

module.exports = mongoose.model('Shorten', shortenSchema)