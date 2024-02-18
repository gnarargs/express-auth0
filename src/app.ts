import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
  const foo = process.env.FOO
  const token = req.query.token
  res.send(`Token is ${token}, foo is: ${foo}`)
})

app.listen(3000, () => {
  console.log('Server started')
})
