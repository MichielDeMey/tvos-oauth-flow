'use strict'

module.exports = {
  baseUrl : 'http://michiel.local:3000',
  soundcloud: {
    connectUri   : 'https://soundcloud.com/connect',
    tokenUri     : 'https://api.soundcloud.com/oauth2/token',
    clientId     : '9c863c845d6d0c7c8fd3283872090c46',
    clientSecret : '093b0b84352de7fdc053f27198630012'
  }
}

module.exports.redirectUri = `${module.exports.baseUrl}/key/connect`
