'use strict'

module.exports = {
  baseUrl : process.env.BASEURL || 'http://127.0.0.1:3000',
  soundcloud: {
    connectUri   : 'https://soundcloud.com/connect',
    tokenUri     : 'https://api.soundcloud.com/oauth2/token',
    clientId     : process.env.CLIENTID,
    clientSecret : process.env.CLIENTSECRET
  }
}

module.exports.redirectUri = `${module.exports.baseUrl}/key/connect`
