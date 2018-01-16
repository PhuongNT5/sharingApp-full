import * as mongoose from 'mongoose';
import constant from '../constant';

export interface ILesson {
    title: String,
    name: String,
    createBy: String,
    date: Date,
    place: String
}

export interface ILessonModel  extends ILesson, mongoose.Document {}

const lessonSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    place: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true
    }
},
    {toObject:{
        virtuals:true
    },
    toJSON: {
        virtuals: true
    }});

lessonSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
export const LessonModel = mongoose.model<ILessonModel>('Lesson', lessonSchema);