const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Shorten = require('./models/shorten')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

// 連線失敗
db.on('error', () => {
  console.log('mongodb error！')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected！')
})


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = req.body.url.trim()

  Shorten.find({ url: url })
    .lean()
    .then(result => {
      if (result.length === 0) {
        const newShorten = {
          url: body.url,
          shorten_url: "http://localhost:3000/12345"
        }
        Shorten.create(newShorten)
        res.render('index', { shorten: newShorten })
      } else {
        res.render('index', { shorten: result[0] })
      }
    })
    .catch(err => console.log(err))
})

app.get('/:shortenCode', (req, res) => {
  const shortenCode = req.params.shortenCode.trim()

  Shorten.find({ shortenCode: shortenCode })
    .lean()
    .then(result => {
      const url = result[0].url
      res.redirect(`${url}`)
    })
    .catch(err => console.log(err))
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})