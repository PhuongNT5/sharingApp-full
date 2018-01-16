import { IUser, RemoveObject, IError, IUserModel } from '../models';

export interface IUserRepository {
    /**
    * find user(s)
    */
    find(query: object): Promise<IUser[] | IError>;
    /**
     * find one user
     */
    findOne(user: object): Promise<IUser>;

    /**
     * insert user
     */
    insert(user: IUser): Promise<IUser>;

    /**
     * update user
     */
    update(user: IUser): Promise<IUser>;

    /**
     * find user by email
     */
    // findById(id: string): Promise<any>;

    /**
     * delete user
     */
    delete(email: String): Promise<RemoveObject | string>;
    toObject(user: any): Object;
}
