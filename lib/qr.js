'use strict'

const qr = require('qr-image')

class QR {

  constructor(key) {
    return qr.image(key, {
      margin: 1,
      size: 20,
      type: 'png',
      parse_url: true
    })
  }

}

module.exports = QR
