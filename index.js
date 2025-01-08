const express = require('express')
const cors = require('cors')
const sequelize = require('./dbConfig')
const app = express()
const port = 3000

app.use(cors())

sequelize.sync().then(() => {
  console.log('Database connected')
})

app.get('/', (req,res) => {
  res.status(200).json({
    Message : 'ok'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})