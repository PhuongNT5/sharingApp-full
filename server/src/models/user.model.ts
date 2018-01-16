import * as mongoose from 'mongoose';
import constant from '../constant';

export interface IUser {
    Id? : string;
    username: String;
    email: String;
    role? : String;
    salt?: String;
    password: String;

}
export interface IUserModel extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    salt: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: constant.ROLE.USER,
    }

},
{
    toObject:{
        virtuals:true
    },
    toJSON: {
        virtuals: true
        }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
export const UserModel = mongoose.model<IUserModel>('User', userSchema);