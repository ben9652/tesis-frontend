import { User } from "./user.entities";

export class PartnerType {
    private _role: string;
    private _explanation_role: string;
    
    constructor(
        role: string,
        explanation_role: string
    ) {
        this._role = role;
        this._explanation_role = explanation_role;
    }
    
    public get role(): string {
        return this._role;
    }
    public get explanation_role(): string {
        return this._explanation_role;
    }
}

export class Partner {
    private _user: User;
    private _roles: PartnerType[];

    constructor(
        user: User,
        roles: PartnerType[]
    ) {
        this._user = user;
        this._roles = roles;
    }

    public get user(): User {
        return this._user;
    }

    public get roles(): PartnerType[] {
        return this._roles;
    }
}