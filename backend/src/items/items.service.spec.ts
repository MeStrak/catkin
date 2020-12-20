import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ItemSchema } from './item.schema';
import { GroupsService } from '../group/groups.service';
import { GroupSchema } from '../group/groups.schema';

describe('ItemsService', () => {
  let service: ItemsService;

  const itemModel = mongoose.model('ItemSchema', ItemSchema);
  const groupModel = mongoose.model('GroupSchema', GroupSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        
      ],
      providers: [
        GroupsService,
        {
          provide: getModelToken('Group'),
          useValue: groupModel,
        },
        ItemsService,
        {
          provide: getModelToken('Item'),
          useValue: itemModel,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
