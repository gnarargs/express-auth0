import express from 'express'

const app = express()

app.get('/', (req, res) => {
  const token = req.query.token
  res.send(`Token is ${token}`)
})

app.listen(3000, () => {
  console.log('Server started')
})
