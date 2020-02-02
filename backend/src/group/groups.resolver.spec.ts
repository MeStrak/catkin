import { Test, TestingModule } from '@nestjs/testing';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { GroupSchema } from './group.schema';

describe('GroupsResolver', () => {
  let resolver: GroupsResolver;
  const groupModel = mongoose.model('GroupSchema', GroupSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsResolver,
        GroupsService,
        {
          provide: getModelToken('Group'),
          useValue: groupModel,
        },
      ],
    }).compile();

    resolver = module.get<GroupsResolver>(GroupsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
