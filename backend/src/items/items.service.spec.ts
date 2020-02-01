import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ItemSchema } from './item.schema';

describe('ItemsService', () => {
  let service: ItemsService;

  const itemModel = mongoose.model('ItemSchema', ItemSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
