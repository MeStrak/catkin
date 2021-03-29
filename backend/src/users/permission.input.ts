import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PermissionInput {

    @Field()
    readonly permissionForObject: string;

    @Field()
    readonly permissionObjectType: string;

    @Field()
    readonly role: string;
}
