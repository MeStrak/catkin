import { ObjectType, Field, Int, ID } from 'type-graphql';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

@ObjectType()
export class ItemType {
  @Field(() => ID)
  @IsString()
  readonly id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @Field(() => Int)
  @IsNumber()
  readonly estimate: number;
  @Field()
  @IsString()
  readonly description: string;
  @Field({ nullable: true })
  @IsString()
  readonly status: string;
  @Field(() => [String])
  @IsArray()
  readonly personas: string[];
  @Field()
  @IsString()
  readonly group: string;
}
