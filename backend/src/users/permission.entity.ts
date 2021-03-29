import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, ValidatePromise } from 'class-validator';

@ObjectType()
export class Permission {
    @Field({
        description: 'ID of the user from the auth provider',
        nullable: false,
    })
    @IsString()
    id: string;

    @Field({ description: 'The type of the object to which this permission applies (Commune | Item | ...)', })
    @IsString()
    readonly permissionObjectType: string;

    @Field({ description: 'The role the user has for this object (Read | Write | Admin)', })
    @IsString()

    readonly role: string;
}