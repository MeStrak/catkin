import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './dto/create-user.dto';
import { UserInput } from './input-users.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';

@Resolver('Users')
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(() => [UserType])
    // @UseGuards(new GqlAuthGuard('jwt'))
    async users() {
        return this.usersService.findAll();
    }

    @Query(() => UserType)
    @UseGuards(new GqlAuthGuard('jwt'))
    async userById(@Args('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => UserType)
    // @UseGuards(new GqlAuthGuard('jwt'))
    async createUser(@Args('input') input: UserInput) {
        return this.usersService.create(input);
    }

    @Mutation(() => UserType)
    @UseGuards(new GqlAuthGuard('jwt'))
    async updateUser(
        @Args('id') id: string,
        @Args('input') input: UserInput,
    ) {
        return this.usersService.update(id, input);
    }

    @Mutation(() => UserType)
    @UseGuards(new GqlAuthGuard('jwt'))
    async deleteUser(@Args('id') id: string) {
        return this.usersService.delete(id);
    }

    @Query(() => String)
    async hello() {
        return 'hello';
    }
}
