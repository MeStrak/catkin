import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        index: true,
        unique: true
    },
    permissions: [
        {
            permissionForObject: String,
            permissionObjectType: String,
            role: String,
        },
    ],
});
