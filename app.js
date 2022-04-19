const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// 連線失敗
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.send('Hello this is shorten url.')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})