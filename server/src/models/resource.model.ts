import * as mongoose from 'mongoose';
import constant from '../constant';

export interface IResource {
    nameOfLesson: String,
    shareBy: String,
    name: String,
    resource: String
}
export interface IResourceModel extends IResource, mongoose.Document{}

const resourceSchema = new mongoose.Schema({
    nameOfLesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    shareBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
    },
    name: {
        type: String,
        required: true
    },
    resource: {
        type: String,
        required: true
    }
},{
    toObject:{
        virtuals:true
    },
    toJSON: {
        virtuals: true
        }
});
resourceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
export const ResourceModel = mongoose.model<IResourceModel>('Lesson', resourceSchema);