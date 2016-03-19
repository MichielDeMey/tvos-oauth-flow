'use strict'

const crypto = require('crypto')

class Key extends String {

  constructor(length, chars) {
    chars = chars || 'ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'
    length = length || 8

    const rnd = crypto.randomBytes(length)
    , value   = new Array(length)
    , len     = chars.length

    for (var i = 0; i < length; i++) {
        value[i] = chars[rnd[i] % len]
    }

    return super(value.join(''))
  }

}

module.exports = Key
