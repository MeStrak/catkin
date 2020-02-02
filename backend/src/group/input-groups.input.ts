import { InputType, Field } from 'type-graphql';

@InputType()
export class GroupInput {
  @Field()
  readonly name: string;
  @Field({ nullable: true })
  readonly description?: string;
}
