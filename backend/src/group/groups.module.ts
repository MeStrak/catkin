import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { GroupSchema } from './groups.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
  ],
  providers: [GroupsService, GroupsResolver],
  exports: [GroupsService],
})
export class GroupsModule {}
