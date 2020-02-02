import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { GroupSchema } from './groups.schema';

describe('GroupsService', () => {
  let service: GroupsService;

  const groupModel = mongoose.model('GroupSchema', GroupSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: getModelToken('Group'),
          useValue: groupModel,
        },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
