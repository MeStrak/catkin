import { Logger, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { ItemsService } from './items.service';
import { ItemInput } from './input-items.input';
import { ItemType } from './dto/create-item.dto';
// import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
// import { Subscription } from 'type-graphql';

const pubSub = new PubSub();

@Resolver()
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [ItemType])
  @UseGuards(new GqlAuthGuard('jwt'))
  async items() {
    return this.itemsService.findAll();
  }

  @Query(() => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async itemById(@Args('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async createItem(@Args('input') input: ItemInput) {
    const createdItem = await this.itemsService.create(input);
    pubSub.publish('itemCreatedOrUpdated', {
      itemCreatedOrUpdated: createdItem,
    });
    return createdItem;

    // return this.itemsService.create(input);
  }

  @Mutation(() => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async updateItem(@Args('id') id: string, @Args('input') input: ItemInput) {
    const updatedItem = await this.itemsService.update(id, input);
    pubSub.publish('itemCreatedOrUpdated', {
      itemCreatedOrUpdated: updatedItem,
    });
    return updatedItem;
  }

  @Mutation(() => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async deleteItem(@Args('id') id: string) {
    const deletedItem = await this.itemsService.delete(id);
    pubSub.publish('itemDeleted', { itemDeleted: deletedItem });
    return deletedItem;
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Subscription(returns => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  itemCreatedOrUpdated(@Args('token') token: string) {
    return pubSub.asyncIterator('itemCreatedOrUpdated');
  }

  @Subscription(returns => ItemType)
  @UseGuards(new GqlAuthGuard('jwt'))
  itemDeleted(@Args('token') token: string) {
    return pubSub.asyncIterator('itemDeleted');
  }
}
