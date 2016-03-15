'use strict'

let _keys = {}
let nonce = []
const nonce_threshold = 1000

class Database {

  static setKey(key, value, TTL) {
    TTL = TTL || 60
    setTimeout(() => {
      this.removeKey(key)
    }, TTL * 1000)

    return _keys[key] = value
  }

  static getKey(key) {
    return _keys[key]
  }

  static setToken(key, token) {
    return _keys[key].token = token
  }

  static removeKey(key) {
    return delete _keys[key]
  }

  static addNonce(n) {
    if (nonce.length >= nonce_threshold) {
      nonce.shift()
    }

    nonce.push(n)
    return
  }

  static hasNonce(n) {
    return nonce.indexOf(n) !== -1
  }

}

module.exports = Database