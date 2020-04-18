import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemsResolver } from './items.resolver';
import { ItemSchema } from './item.schema';
import { ItemsService } from './items.service';
import { GroupsModule } from '../group/groups.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    GroupsModule,
  ],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
