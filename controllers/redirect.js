'use strict'

const config = require('../config')

module.exports = (req, res) => {
  // The magic here is to pass the key in the state parameter so we can track who this is
  const url = `${config.soundcloud.connectUri}?client_id=${config.soundcloud.clientId}&redirect_uri=${config.redirectUri}&display=next&response_type=code&scope=non-expiring&state=${req.params.key}`
  return res.redirect(url)
}
