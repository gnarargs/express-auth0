import axios, { type AxiosResponse } from 'axios'
import querystring from 'querystring'

export interface AuthConfig {
  baseUrl: string
  clientID: string
  clientSecret: string
  redirectUri: string
}

const fetchToken = async (config: AuthConfig, code: string): Promise<AxiosResponse> => {
  const body = {
    grant_type: 'authorization_code',
    client_id: config.clientID,
    client_secret: config.clientSecret,
    code: code,
    redirect_uri: config.redirectUri
  }

  return await axios.post(
    `https://${config.baseUrl}/oauth/token`,
    querystring.stringify(body),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
}

export default fetchToken
