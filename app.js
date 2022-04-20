const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Shorten = require('./models/shorten')
const generateShortenCode = require('./untis/generateShortenCode')
const shortenCodeLength = 5

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
  console.log(url.isValidUrl())

  Shorten.find({ url: url })
    .lean()
    .then(result => {
      if (result.length === 0) { // 如果為0，表示資料庫沒有
        const newShorten = {
          url: url,
          shortenCode: generateShortenCode(shortenCodeLength)
        }
        Shorten.create(newShorten) // 建立新資料
        res.render('index', { shorten: newShorten }) // 傳給 index 去渲染得到的短網址
      } else {
        res.render('index', { shorten: result[0] }) // 如果不為0，表示資料庫有，直接將結果傳給 index 去渲染
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