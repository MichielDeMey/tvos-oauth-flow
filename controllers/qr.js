'use strict'

const QR      = require('../lib/qr')
const baseUrl = require('../config').baseUrl

module.exports = (req, res) => {
  const qr = new QR(`${baseUrl}/key/${req.params.key}/redirect`)
  res.type('image/png')
  qr.pipe(res)
}
