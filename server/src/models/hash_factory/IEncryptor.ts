/**
 * Encryptor Interface to have functionality related to encrpyt and generates hash codes for passed string
 */
export default interface IEncryptor {
  /**
   * Generates hashcode for the string passed
   * @param str string for which hashcode is to be generated
   */
  generateHash(str: string): string
}
