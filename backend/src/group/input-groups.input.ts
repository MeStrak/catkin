import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GroupInput {
  @Field()
  readonly name: string;
  @Field()
  readonly security: string;
  @Field({ nullable: true })
  readonly description?: string;
}
