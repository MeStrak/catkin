import { Logger, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { ItemsService } from './items.service';
import { ItemInput } from './input-items.input';
import { ItemType } from './dto/create-item.dto';
// import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { User } from '../users/user.decorator';
import { GetUserGroups, GetWritableUserGroups } from '../users/user.helper';
import { GroupsService } from '../group/groups.service';
import { InjectModel } from '@nestjs/mongoose';
// import { Subscription } from '@nestjs/graphql';

const pubSub = new PubSub();

@Resolver()
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [ItemType])
  @UseGuards(new GqlAuthGuard('jwt'))
  async items(@User() user: any) {
    let groups: string[] = GetUserGroups(user);
    // TODO: get board ID and add filter to find all query
    return await this.itemsService.findAll(groups, [], true);
  }

  @Query(() => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async itemById(@User() user: any, @Args('id') id: string) {
    let groups: string[] = GetUserGroups(user);

    return this.itemsService.findOne(id, groups);
  }

  @Mutation(() => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async createItem(@User() user: any, @Args('input') input: ItemInput) {
    //TODO: move this group write access check to a decorator
    if (!GetWritableUserGroups(user).includes(input.group)) {
      throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
    }
    const createdItem = await this.itemsService.create(input);
    pubSub.publish('itemCreatedOrUpdated', {
      itemCreatedOrUpdated: createdItem,
    });
    return createdItem;
  }

  @Mutation(() => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async updateItem(
    @User() user: any,
    @Args('id') id: string,
    @Args('input') input: ItemInput,
  ) {
    //TODO: move this group write access check to a decorator
    //TODO: fix security hole - if user has ID of item they don't have permission to edit, they could update the group and get write access
    if (!GetWritableUserGroups(user).includes(input.group)) {
      throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
    }
    const updatedItem = await this.itemsService.update(id, input);
    pubSub.publish('itemCreatedOrUpdated', {
      itemCreatedOrUpdated: updatedItem,
    });
    return updatedItem;
  }

  @Mutation(() => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async deleteItem(@User() user: any, @Args('id') id: string) {
    //TODO: check user has write access to group of this item
    const deletedItem = await this.itemsService.delete(id);
    pubSub.publish('itemDeleted', { itemDeleted: deletedItem });
    return deletedItem;
  }

  @Subscription((returns) => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  //TODO: check user has access to group of this item
  itemCreatedOrUpdated(@Args('token') token: string) {
    return pubSub.asyncIterator('itemCreatedOrUpdated');
  }

  @Subscription((returns) => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  itemDeleted(@Args('token') token: string) {
    //TODO: check user has access to group of this item

    return pubSub.asyncIterator('itemDeleted');
  }
}
