import * as express from 'express';
import { UserController } from '../controllers';
import { parser } from '../middleware/jwt-parse';
import constant from '../constant';
import { Response, Request } from '@angular/http';
export const userRouter = express.Router();

const register = (req, res, next) => {
    UserController.register(req).then(respone => res.send(respone))
        .catch(err => res.status(400).send(err));
};

const updateUser = (req, res, next) => {
    UserController.updateUser(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const resetPassword = (req, res, next) => {
    UserController.resetPassword(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const login = (req, res, next) => {
    UserController.login(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const changePass = (req, res, next) => {
    UserController.changePass(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const deleteUser = (req, res, next) => {
    UserController.deleteUser(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const find = (req, res, next) => {
    UserController.find().then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};
const findUserById = (req, res, next) => {
    UserController.findUserById(req)
        .then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

userRouter.route('/').put(parser([constant.ROLE.USER, constant.ROLE.ADMIN]), updateUser);

userRouter.route('/resetpassword/:email').get(resetPassword);

userRouter.route('/').post(register);


userRouter.route('/login').post(login);

userRouter.route('/changepassword').put(parser([constant.ROLE.USER, constant.ROLE.ADMIN]), changePass);

userRouter.route('/:email').delete(parser([constant.ROLE.ADMIN]), deleteUser);


userRouter.route('/').get(parser([constant.ROLE.USER, constant.ROLE.ADMIN]), find);


userRouter.route('/:id').get(parser([constant.ROLE.USER, constant.ROLE.ADMIN]), findUserById);





