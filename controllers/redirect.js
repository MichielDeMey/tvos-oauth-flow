'use strict'

const config = require('../config')

module.exports = (req, res) => {
  const url = `${config.soundcloud.connectUri}?client_id=${config.soundcloud.clientId}&redirect_uri=${config.redirectUri}&display=next&response_type=code&scope=non-expiring&state=${req.params.key}`
  return res.redirect(url)
}
