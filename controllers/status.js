'use strict'

const DB = require('../lib/db')

module.exports = (req, res) => {
  const secret = req.body.secret
  const nonce = req.body.nonce
  const key = req.params.key

  if (!nonce || !secret || DB.hasNonce(nonce))
    return res.status(400).end()
  DB.addNonce(nonce)

  const dbKey = DB.getKey(key)
  if (!dbKey) return res.status(404).end()
  if (secret != dbKey.secret) return res.status(401).end()

  if (!dbKey.token) return res.status(202).end()

  if (dbKey.token) {
    res.type('text/plain')
    res.send(dbKey.token)

    return DB.removeKey(key)
  }
}
