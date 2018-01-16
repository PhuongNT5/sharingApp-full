import { IUser } from '../models';
import { UserRepository } from '../repositories';
import { UserServiceInstance } from '../services';

const userService = UserServiceInstance;

const register = (req) => {
    const userRegister: IUser = req.body;
    return userService.register(userRegister).then(user => Promise.resolve(user))
        .catch(err => Promise.reject(err));
};
const updateUser = (req) => {
    const userToUpdate: IUser = req.body;
    return userService.update(userToUpdate)
        .then((response) => Promise.resolve(response))
        .catch((err) => Promise.reject(err));
};

const resetPassword = (req) => {
    const email: string = req.params.email;
    return userService.resetPassword(email)
        .then((response) => Promise.resolve(response))
        .catch((err) => Promise.reject(err));
};

const login = (req) => {
    const email = req.body.email;
    const password = req.body.password;
    return userService.login(email, password)
        .then(result => Promise.resolve(result))
        .catch(err => Promise.reject(err));
};
const changePass = (req) => {
    const email = req.body.email;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    return userService.changePassword(email, oldPass, newPass)
        .then(result => Promise.resolve(result))
        .catch(err => Promise.reject(err));
};
const deleteUser = (req) => {
    const email = req.params.email;
    return userService.delete(email)
        .then(result => Promise.resolve(result))
        .catch(err => Promise.reject(err)); //Promise.reject(err))
};
const findUsers = () => {
    return userService.findUsers().then(response => Promise.resolve(response))
        .catch(err => Promise.reject(err));
};
const findUserById = (req) => {
    const id = req.params.id;
    return userService.findUserById(id).then(response => Promise.resolve(response))
        .catch(err => Promise.reject(err));
};
export const UserController = {
    register: register,
    resetPassword: resetPassword,
    updateUser: updateUser,
    login: login,
    changePass: changePass,
    deleteUser: deleteUser,
    find: findUsers,
    findUserById: findUserById,
};
