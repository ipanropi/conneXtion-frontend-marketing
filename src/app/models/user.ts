export class User {
    public userId: number;
    public username: string;
    public password: string;
    public phoneNumber: string;
    public phoneNumberConfirmed: boolean;
    public fullName: string;
    public email: string;
    public emailConfirmed: boolean;
    public profileImage: string;
    public status: string;
    public verifiedAt: string;
    public createdBy: string;
    public updatedBy: string;
    public createdAt: string;
    public updatedAt: string;
    public userLogins: string[];
    public roles: [{id: number, roleName: string}];
    public token: string;
    public refreshToken: string;

    public familyName: string;
    public maritalStatus: string;
    public gender: string;
    public dateOfBirth: string;
    public title: string;
    public nationality: string;
    public visaStatus: string;
    public landLine: string;

    public address1: string;
    public address2: string;
    public address3: string;
    public postalCode: string;
    public cityId: number;
    public stateId: number;
    public countryId: number;
    public roleName: string;
}
