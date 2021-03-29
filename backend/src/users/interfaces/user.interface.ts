import { Document } from 'mongoose';

export interface User extends Document {
    readonly id: string;
    permissions: [
        {
            permissionForObject: string,
            permissionObjectType: string,
            role: string,
        }];
}
