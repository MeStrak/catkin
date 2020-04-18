import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';
import { BoardSchema } from './boards.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema }]),
  ],
  providers: [BoardsService, BoardsResolver],
})
export class BoardsModule {}
