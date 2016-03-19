'use strict'

const request = require('request')
const DB      = require('../lib/db')
const config  = require('../config')

module.exports = (req, res) => {
  const code = req.query.code
  const key = req.query.state

  const options = {
    uri: config.soundcloud.tokenUri,
    method: 'POST',
    json: true,
    qs: {
      client_id     : config.soundcloud.clientId,
      client_secret : config.soundcloud.clientSecret,
      grant_type    : 'authorization_code',
      redirect_uri  : config.redirectUri,
      code          : code,
      scope         : 'non-expiring'
    }
  }

  // Make request to get the token
  request(options, (error, data) => {
    if (error || data.body.error) {
      DB.removeKey(key)
      throw (error || data.body.error)
      return res.status(500).end()
    }

    DB.setToken(key, data.body.access_token)
    res.redirect('/index.html')
  })
}
