import DefaultEncryptor from './DefaultEncryptor'
import IEncryptor from './IEncryptor'
import ShaEncryptor from './ShaEncryptor'

/**
 * Factor pattern to create and return an Encryptor based on the scheme mentioned
 */
export default class HashFactory {
  private encryption: string

  constructor(encryption?: string) {
    this.encryption = encryption
  }

  /**
   * Create and return an encryptor based on scheme requested
   */
  createEncryptor(): IEncryptor {
    switch (this.encryption) {
      case 'sha256':
        return new ShaEncryptor()
      default:
        return new DefaultEncryptor()
    }
  }
}
