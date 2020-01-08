import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class ItemInput {
    @Field()
    readonly title: string;
    @Field(() => Int)
    readonly estimate: number;
    @Field()
    readonly description: string;
    @Field({ nullable: true })
    readonly status?: string;
    @Field(() => [String])
    readonly personas: string[];

}
