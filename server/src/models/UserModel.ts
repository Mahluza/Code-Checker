const bcrypt = require('bcrypt')

export default class UserModel{
    private firstName: string;
    private lastName: string;
    private institution: string;
    private email: string;
    private passwordHash: string;

    constructor(firstName: string,
        lastName: string,
        institution: string,
        email: string,
        password: string){
            this.firstName = firstName;
            this.lastName = lastName;
            this.institution = institution;
            this.email = email;
            this.passwordHash = bcrypt.hashSync(password, 10);
        }

    validate(password: string): boolean{
        return bcrypt.compareSync(password, this.passwordHash);
    }
}