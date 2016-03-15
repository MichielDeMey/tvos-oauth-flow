'use strict'

const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const Key = require('./lib/key')
const QR  = require('./lib/qr')
const DB  = require('./lib/db')

const PORT = process.argv.PORT || 3000
const app = express()

const clientId = '9c863c845d6d0c7c8fd3283872090c46'
const clientSecret = '093b0b84352de7fdc053f27198630012'
const connectUrl = 'https://soundcloud.com/connect'
const baseUrl = 'http://michiel.local:3000'
const redirectUri = `${baseUrl}/key/connect`

app.disable('x-powered-by')
app.use(compression())
app.use(bodyParser.json())

// Generate a new unique key
app.post('/key/generate', (req, res) => {
  const secret = req.body.secret
  if (!secret) return res.status(400).end()

  let key
  do
    key = new Key().valueOf()
  while (!!DB.getKey(key))

  DB.setKey(key, { secret })

  res.status(202).json({
    key,
    status: `${baseUrl}/key/${key}`,
    qr: `${baseUrl}/key/${key}/qr`
  })
})

// Used by TvOS to get the key status
app.post('/key/:key', (req, res) => {
  const secret = req.body.secret
  const nonce = req.body.nonce
  const key = req.params.key

  const dbKey = DB.getKey(key)

  if (!nonce) return res.status(400).end()
  if (DB.hasNonce(nonce)) return res.status(400).end()
  DB.addNonce(nonce)
  if (!dbKey) return res.status(404).end()
  if (!secret || secret != dbKey.secret) return res.status(401).end()

  if (!dbKey.token) return res.status(202).end()

  if (dbKey.token) {
    res.type('text/plain')
    res.send(dbKey.token)

    return DB.removeKey(key)
  }
})

// Get a QR image with a short redirect URL
app.get('/key/:key/qr', (req, res) => {
  const qr = new QR(`${baseUrl}/key/${req.params.key}/redirect`)
  res.type('image/png')
  qr.pipe(res)
})

// Redirect to the Soundcloud connect screen
app.get('/key/:key/redirect', (req, res) => {
  const url = `${connectUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&display=next&response_type=code&scope=non-expiring&state=${req.params.key}`
  res.redirect(url)
})

app.get('/key/connect', (req, res) => {
  const code = req.query.code
  const key = req.query.state

  const options = {
    url: 'https://api.soundcloud.com/oauth2/token',
    method: 'POST',
    json: true,
    qs: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code: code,
      scope: 'non-expiring'
    }
  }

  request(options, (error, data) => {
    if (error) {
      DB.removeKey(key)
      return res.status(500).end()
    }

    DB.setToken(key, data.body.access_token)
    res.send('Logging you in..')
  })

})

app.listen(PORT, () => {
  console.log(`Listening on port  ${PORT}`)
})
