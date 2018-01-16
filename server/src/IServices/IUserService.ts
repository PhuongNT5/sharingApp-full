import { IUser, SaltAndPass, Payload, RemoveObject, IError } from '../models';
export interface IUserService {
    // register(user: IUser): Promise<SaltAndPass>;
    update(newUser: IUser): Promise<IUser>;
    resetPassword(email: string): Promise<IUser>;
    register(user: IUser): Promise<IUser>;
    login(email: String, password: String): Promise<Payload>;
    changePassword(email: String, oldPass: String, newPass: String): Promise<String>;
    delete(email: String): Promise<RemoveObject | string>;
    findUsers(): Promise<IUser[] | IError>;
    findUserById(id: string): Promise<IUser | IError>;
}

