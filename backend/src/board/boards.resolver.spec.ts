import { Test, TestingModule } from '@nestjs/testing';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BoardSchema } from './boards.schema';

describe('BoardsResolver', () => {
  let resolver: BoardsResolver;
  const boardModel = mongoose.model('BoardSchema', BoardSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsResolver,
        BoardsService,
        {
          provide: getModelToken('Board'),
          useValue: boardModel,
        },
      ],
    }).compile();

    resolver = module.get<BoardsResolver>(BoardsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
