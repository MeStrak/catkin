import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Permission } from '../permission.entity';

@ObjectType()
export class UserType {
    @Field(() => ID)
    @IsString()
    id: string;

    @Field((() => [Permission]))
    permissions: Permission[];
}