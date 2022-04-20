const Shorten = require('../shorten')
const shortenData = require('./shorten.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('creating seeds ...')
  Shorten.create(shortenData)
    .then(() => {
      console.log('done！')
      db.close()
    })
    .catch(error => console.log(error))
})