import DefaultEncryptor from "./DefaultEncryptor";
import IEncryptor from "./IEncryptor";
import ShaEncryptor from "./ShaEncryptor";

export default class HashFactory {
    private encryption: string;

    constructor(encryption?: string) {
        this.encryption = encryption;
    }

    createEncryptor(): IEncryptor {
        switch (this.encryption) {
            case "sha256":
                return new ShaEncryptor();
            default:
                return new DefaultEncryptor();
        }
    }
}