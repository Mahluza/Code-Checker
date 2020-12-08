import IEncryptor from './IEncryptor'

/**
 * Default Encryptor to encrypt and return the text as is. This encryption scheme can be human readable and useful for
 * debugging purposes
 */
export default class DefaultEncryptor implements IEncryptor {
  /**
   * Generates hashcode for the string passed which is direct text that is passed
   * @param str string for which hashcode is to be generated
   */
  generateHash(str: string): string {
    return str
  }
}
