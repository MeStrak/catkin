import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PersonaInput {
  @Field()
  readonly name: string;
  @Field({ nullable: true })
  readonly role?: string;
  @Field({ nullable: true })
  readonly likes?: string;
  @Field({ nullable: true })
  readonly pains?: string;
  @Field({ nullable: true })
  readonly goal?: string;
  @Field(() => String)
  readonly group: string;
}
