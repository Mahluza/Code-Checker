import IEncryptor from './IEncryptor'

export default class DefaultEncryptor implements IEncryptor {
  generateHash(str: string): string {
    return str
  }
}
