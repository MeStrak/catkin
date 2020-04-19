import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BoardInput {
  @Field()
  readonly name: string;
  @Field({ nullable: true })
  readonly description?: string;
  @Field()
  readonly group: string;
}
