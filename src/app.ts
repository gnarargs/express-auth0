import express from 'express'
import 'dotenv/config'
import fetchToken, { type AuthConfig } from './auth'

const app = express()

const authConfig: AuthConfig = {
  baseUrl: process.env.AUTH0_DOMAIN ?? '',
  clientID: process.env.AUTH0_CLIENT_ID ?? '',
  clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
  redirectUri: process.env.AUTH0_REDIRECT_URI ?? ''
}

app.get('/', (req, res) => {
  const authRedirect = `https://${authConfig.baseUrl}/authorize?response_type=code&client_id=${authConfig.clientID}&redirect_uri=${authConfig.redirectUri}`

  res.redirect(authRedirect)
})

app.get('/callback', async (req, res) => {
  const code = req.query.code?.toString() ?? ''

  const resp = await fetchToken(authConfig, code)

  res.send(resp.data)
})

app.listen(3000, () => {
  console.log('Server started')
})
