import { DBContextSingleton } from '../repositories';
import { IUserService } from '../IServices/IUserService';
import { IUser, Payload, RemoveObject, IError } from '../models';
import { BcryptServiceInstance, EmailServiceInstance } from '../services';
import { IUserRepository } from '../IRepositories';
import * as jwt from 'jsonwebtoken';
import constant from '../constant';


class UserService implements IUserService {
    private static instance: UserService;
    private userRepository: IUserRepository;
    private constructor() {
        this.userRepository = DBContextSingleton.getUser();
    }
    public static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    public update(newUser: IUser): Promise<IUser> {
        return this.userRepository.update(newUser)
            .then((response) => Promise.resolve(response))
            .catch((err) => Promise.reject(err));
    }
    public resetPassword(email: string): Promise<any> {
        return this.userRepository.find({ email: email })
            .then((response) => {
                console.log(email);
                const content = `Hello ${response[0].name.toString()}!
                
There is no reason to fret if you have forgotten your Sharing App password. It happens to the best of us! Here is a simple one click solution for password reset.

Click the link below to take you to the create a new password page.

https://www.phui.com/resetpassword/${response[0].id.toString()}

If you have not made any password reset request, it is likely another user entered your email address by mistake and you can simply disregard this email.

For further help or clarifications, please contact support@phui.com.

Thank you

Phuong`;
                return EmailServiceInstance.sendEmail(response[0].email.toString(), content).then(() => {
                    return Promise.resolve({
                        message: 'Checkmail'
                    });
                });
            })
            .catch((err) => Promise.reject({
                message: 'User does not exist'
            }));
    }
    public register(newUser: IUser): Promise<IUser> {
        return BcryptServiceInstance.getSaltAndHashpass(newUser.password).then(saltAndPass => {
            newUser.password = saltAndPass.hashPass;
            newUser.salt = saltAndPass.salt;
            return this.userRepository.insert(newUser).then(user => {
                delete user.password;
                delete user.salt;
                return Promise.resolve(user);
            }).catch(err => Promise.reject(err + ''));
        }).catch(err => Promise.reject(err + ''));

    }
    public login(email: String, otherPass: String): Promise<Payload> {
        return this.userRepository.find({ email: email }).then(users => {
            if (users[0]) {
                return BcryptServiceInstance.comparePass(otherPass, users[0].password).then(res => {
                    if (res) {
                        delete users[0].password;
                        delete users[0].salt;
                        return new Promise<Payload>((resolve, reject) => {
                            return jwt.sign(users[0], constant.JWTsecrect, function (err, token) {
                                if (err) {
                                    reject('loi thang sign roi');
                                }
                                const payload: Payload = {
                                    user: users[0],
                                    token: token
                                };
                                resolve(payload);
                            });
                        });

                    }
                }).catch(err => {
                    return Promise.reject({ message: 'email or password invalid' });
                });
            } else {
                return Promise.reject({ message: 'email or password invalid' });
            }
        });
    }
    changePassword(email: String, oldPass: String, newPass: String): Promise<String> {
        return this.userRepository.find({ email: email }).then(users => {
            if (users[0]) {
                return BcryptServiceInstance.comparePass(oldPass, users[0].password).then(res => {
                    if (res) {
                        return BcryptServiceInstance.getSaltAndHashpass(newPass).then(saltAndPass => {
                            users[0].password = saltAndPass.hashPass;
                            users[0].salt = saltAndPass.salt;
                            return this.userRepository.update(users[0]).then(user => {
                                return Promise.resolve('change password success');
                            });
                        });
                    }
                }).catch(() => Promise.reject('password not correct'));
            }
        });
    }
    delete(email: String): Promise<RemoveObject | string> {
        return this.userRepository.delete(email).then(result => {
            return Promise.resolve(result);
        }).catch(err => Promise.reject(err));
    }
    findUsers(): Promise<IUser[] | IError> {
        return this.userRepository.find({})
            .then(users => Promise.resolve(users))
            .catch(err => Promise.reject(err));
    }
    findUserById(id: string): Promise<IUser | IError> {
        return this.userRepository.findOne({ _id: id })
            .then(user => Promise.resolve(user))
            .catch(err => Promise.reject({
                statusCode: 400,
                message: 'user not exist'
            }));
    }
}
export const UserServiceInstance = UserService.getInstance();
