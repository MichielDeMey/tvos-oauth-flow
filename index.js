const express     = require('express')
const bodyParser  = require('body-parser')
const compression = require('compression')

const config      = require('./config').soundcloud

const PORT = process.env.PORT || 3000
const app  = express()

app.disable('x-powered-by')
app.use(express.static(__dirname + '/public'))
app.use(compression())
app.use(bodyParser.json())

if (!config.clientId ||
    !config.clientSecret) {
  console.warn('WARNING! Soundcloud id/secret not set!')
}

// 1. Generate a new unique key
app.post('/key/generate', require('./controllers/generate'))

// 2. Generate a QR image with a short redirect URL
app.get('/key/:key/qr', require('./controllers/qr'))

// 3. Redirect to the Soundcloud connect screen
app.get('/key/:key/redirect', require('./controllers/redirect'))

// 4. Connect the token to the key
app.get('/key/connect', require('./controllers/connect'))

// Used by TvOS to get the key status
app.post('/key/:key', require('./controllers/status'))


// Alias
app.get('/activate', (req, res) => { res.redirect('/activate.html') })

app.listen(PORT, () => {
  console.log(`Listening on port  ${PORT}`)
})
