const { exec } = require('child_process')
const express = require('express')
const axios = require('axios')
const {stringify} = require('querystring')
require('dotenv').config()

const app = express()

const authDomain = process.env.AUTH0_DOMAIN
const authClientID = process.env.AUTH0_CLIENT_ID
const authClientSecret = process.env.AUTH0_CLIENT_SECRET
const authRedirectUri = process.env.AUTH0_REDIRECT_URI

const authorizeRequest = `https://${authDomain}/authorize?response_type=code&client_id=${authClientID}&redirect_uri=${encodeURIComponent(authRedirectUri)}&scope=openid%20profile`

exec(`open "${authorizeRequest}"`)

app.get('/callback', async (req, res) => {
    const code = req.query.code.toString()

    const body = {
        grant_type: 'authorization_code',
        client_id: authClientID,
        client_secret: authClientSecret,
        code: code,
        redirect_uri: authRedirectUri
    }

    const tokenResponse = await axios.post(
        `https://${authDomain}/oauth/token`,
        stringify(body),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    console.log(`Got Token: ${tokenResponse.data.access_token}`)
    console.log(`ID Token: ${tokenResponse.data.id_token}`)

    res.send(`Got Token: ${tokenResponse.data.access_token}`)
    shutdown()
})

const server = app.listen(3000, () => {
    console.log('Server started')
})


function shutdown() {
    server.close(() => process.exit(0))
}

