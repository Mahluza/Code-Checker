import IEncryptor from './IEncryptor'

const crypto = require('crypto')

/**
 * Sha256 Encryptor to encrypt the string using SHA256 encryption technique
 */
export default class ShaEncryptor implements IEncryptor {
  generateHash(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex')
  }
}
