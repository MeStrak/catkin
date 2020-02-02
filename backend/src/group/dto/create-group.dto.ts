import { ObjectType, Field, Int, ID } from 'type-graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType()
export class GroupType {
  @Field(() => ID)
  @IsString()
  readonly id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @Field({ nullable: true })
  @IsString()
  readonly role?: string;
  @Field({ nullable: true })
  @IsString()
  readonly likes?: string;
  @Field({ nullable: true })
  @IsString()
  readonly pains?: string;
  @Field({ nullable: true })
  @IsString()
  readonly goal?: string;
}
