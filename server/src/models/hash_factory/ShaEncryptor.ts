import IEncryptor from './IEncryptor'

const crypto = require('crypto')

export default class ShaEncryptor implements IEncryptor {
  generateHash(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex')
  }
}
