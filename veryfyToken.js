const jose = require('jose')
require('dotenv').config()

const JWKS = jose.createRemoteJWKSet(
    new URL(`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`)
);

const jwt = process.argv[2]

async function verifyToken() {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, JWKS, {
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        audience: 'http://localhost'
    })

    console.log(protectedHeader)
    console.log(payload)
}

verifyToken()
