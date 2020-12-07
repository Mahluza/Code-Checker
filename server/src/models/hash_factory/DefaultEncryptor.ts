import IEncryptor from './IEncryptor'

/**
 * Default Encryptor to encrypt and return the text as is. This encryption scheme can be human readable and useful for
 * debugging purposes
 */
export default class DefaultEncryptor implements IEncryptor {
  generateHash(str: string): string {
    return str
  }
}
