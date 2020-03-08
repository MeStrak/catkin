import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BoardSchema } from './boards.schema';

describe('BoardsService', () => {
  let service: BoardsService;

  const boardModel = mongoose.model('BoardSchema', BoardSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: getModelToken('Board'),
          useValue: boardModel,
        },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
