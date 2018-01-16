import { IUser } from '../models';
export interface SaltAndPass {
    hashPass: String;
    salt: String;
}

export interface Payload {
    user: IUser;
    token: String;
}
export interface IError {
    statusCode: number;
    message: string;
}

export interface RemoveObject {
    n: Number;
    ok: Number;
}

export interface Payload {
    user: IUser;
    token: String;
}
