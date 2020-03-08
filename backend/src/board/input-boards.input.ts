import { InputType, Field } from 'type-graphql';

@InputType()
export class BoardInput {
  @Field()
  readonly name: string;
  @Field({ nullable: true })
  readonly description?: string;
}
