import { InputType, Field } from '@nestjs/graphql';
import { PermissionInput } from './permission.input';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';


@InputType()
export class UserInput {
    @Field()
    readonly id: string;

    @Field(() => [PermissionInput], { nullable: true })
    @IsObject({ each: true })
    @IsOptional({ each: true })
    @ValidateNested({ each: true })
    readonly permissions?: PermissionInput[];
}
