import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { GroupsService } from './groups.service';
import { GroupType } from './dto/create-group.dto';
import { GroupInput } from './input-groups.input';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { User } from '../users/user.decorator';

@Resolver('Groups')
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(() => [GroupType])
  @UseGuards(new GqlAuthGuard('jwt'))
  async groups(@User() user: any) {
    //get groups from access token - only those groups will be returned
    let groups: string[] = [];
    user['https://catkin.dev/permissions'].forEach(element => {
      groups.push(element.group);
    });

    return this.groupsService.findAll(groups);
  }

  @Query(() => GroupType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async groupById(@Args('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Mutation(() => GroupType)
  // @UseGuards(new GqlAuthGuard('jwt'))
  async createGroup(@Args('input') input: GroupInput) {
    return this.groupsService.create(input);
  }

  @Mutation(() => GroupType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async updateGroup(@Args('id') id: string, @Args('input') input: GroupInput) {
    return this.groupsService.update(id, input);
  }

  @Mutation(() => GroupType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async deleteGroup(@Args('id') id: string) {
    return this.groupsService.delete(id);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
