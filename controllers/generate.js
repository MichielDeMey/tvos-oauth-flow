'use strict'

const Key     = require('../lib/key')
const DB      = require('../lib/db')
const baseUrl = require('../config').baseUrl

module.exports = (req, res) => {
  const secret = req.body.secret
  if (!secret) return res.status(400).end()

  let key
  do
    key = new Key().valueOf()
  while (!!DB.getKey(key))

  DB.addKey(key, { secret })

  res.status(201).json({
    key,
    status: `${baseUrl}/key/${key}`,
    qr: `${baseUrl}/key/${key}/qr`
  })
}
