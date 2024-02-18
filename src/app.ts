import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
  const authBaseUrl = process.env.AUTH0_DOMAIN
  const authClientID = process.env.AUTH0_CLIENT_ID
  const authRedirectUri = process.env.AUTH0_REDIRECT_URI

  const authRedirect = `https://${authBaseUrl}/authorize?response_type=code&client_id=${authClientID}&redirect_uri=${authRedirectUri}`

  res.redirect(authRedirect)
})

app.get('/callback', (req, res) => {
  console.log(req.params)
  res.send('OK')
})

app.listen(3000, () => {
  console.log('Server started')
})
