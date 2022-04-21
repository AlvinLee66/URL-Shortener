const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000
const Shorten = require('./models/shorten')
const generateShortenCode = require('./untis/generateShortenCode')
const shortenCodeLength = 5 //決定縮碼有幾碼

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = req.body.url.trim() // 除去前後因使用者不小心輸入的空格
  const shortenCode = generateShortenCode(shortenCodeLength)

  Shorten.find({ url: url })
    .lean()
    .then(result => {
      if (result.length === 0) { // 如果為0，表示資料庫沒有，則建立新資料
        const newShorten = { url, shortenCode }
        Shorten.create(newShorten)
        res.render('index', { shorten: newShorten }) // 傳給 index 去渲染得到的短網址
      } else {
        res.render('index', { shorten: result[0] }) // 如果不為0，表示資料庫有，直接將結果傳給 index 去渲染
      }
    })
    .catch(err => console.log(err))
})

app.get('/:shortenCode', (req, res) => {
  const shortenCode = req.params.shortenCode.trim() // 如果使用者不小心在前後輸入空格一樣可以轉到對應的網頁
  if (shortenCode.length !== shortenCodeLength) return res.redirect('/') // 如果輸入的短網址不是5碼則一律回到首頁
  
  Shorten.find({ shortenCode }) // 用 shortenCode 找出對應的資料
    .lean()
    .then(result => {
      const url = result[0].url
      res.redirect(`${url}`) // 導入對應的原網址
    })
    .catch(err => console.log(err))
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})