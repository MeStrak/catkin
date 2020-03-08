import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { BoardsService } from './boards.service';
import { BoardType } from './dto/create-board.dto';
import { BoardInput } from './input-boards.input';
import { GqlAuthGuard } from '../auth/gqlauth.guard';

@Resolver('Boards')
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [BoardType])
  @UseGuards(new GqlAuthGuard('jwt'))
  async boards() {
    return this.boardsService.findAll();
  }

  @Query(() => BoardType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async boardById(@Args('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Mutation(() => BoardType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async createBoard(@Args('input') input: BoardInput) {
    return this.boardsService.create(input);
  }

  @Mutation(() => BoardType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async updateBoard(@Args('id') id: string, @Args('input') input: BoardInput) {
    return this.boardsService.update(id, input);
  }

  @Mutation(() => BoardType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async deleteBoard(@Args('id') id: string) {
    return this.boardsService.delete(id);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
