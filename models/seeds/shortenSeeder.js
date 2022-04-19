const mongoose = require('mongoose')
const Shorten = require('../shorten')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const shortenData = require('./shorten.json').results

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected！')
  console.log('creating seeds ...')
  Shorten.create(shortenData)
    .then(()=> {console.log('done！')})
    .catch(error => console.log(error))
})