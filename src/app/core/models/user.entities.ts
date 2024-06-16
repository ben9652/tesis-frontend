export class User {
    private _id_user: number;
    private _username: string;
    private _lastName: string;
    private _firstName: string;
    private _email: string;
    private _role: string;

    constructor(
        id_user: number,
        username: string,
        lastName: string,
        firstName: string,
        email: string,
        role: string
    ) {
        this._id_user = id_user;
        this._username = username;
        this._lastName = lastName;
        this._firstName = firstName;
        this._email = email;
        this._role = role;
    }

    public get id_user(): number {
        return this._id_user;
    }
    public get username(): string {
        return this._username;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public get firstName(): string {
        return this._firstName;
    }
    public get email(): string {
        return this._email;
    }
    public get role(): string {
        return this._role;
    }
    public set role(value: string) {
        this._role = value;
    }
}