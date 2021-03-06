import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType()
export class BoardType {
  @Field(() => ID)
  @IsString()
  readonly id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @Field({ nullable: true })
  @IsString()
  readonly description: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly group: string;
}
