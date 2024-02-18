import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
})

app.listen(3000, () => {
  console.log('Server started')
})