import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true });

export default models.user || model('user', UserSchema);