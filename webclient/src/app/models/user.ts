export class User {
    constructor(){};

    userId: string;
    acctType: string;
    phone: string;
    phoneVerified: boolean;
    claims: string[];
    created: Date;
    fullname: string;
    email: string;
    emailVerified: boolean;
    profilePhoto: string;
}