import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardType } from './dto/create-board.dto';
import { Board } from './interfaces/board.interface';
import { BoardInput } from './input-boards.input';

@Injectable()
export class BoardsService {
  constructor(@InjectModel('Board') private boardModel: Model<Board>) {}

  async create(createBoardDto: BoardInput): Promise<Board> {
    const createdBoard = new this.boardModel(createBoardDto);
    return await createdBoard.save();
  }

  async findAll(groups: string[]): Promise<Board[]> {
    return await this.boardModel.find({ group: groups }).exec();
  }

  async findOne(id: string): Promise<Board> {
    return await this.boardModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Board> {
    return await this.boardModel.findByIdAndRemove(id);
  }

  async update(id: string, board: Board): Promise<Board> {
    return await this.boardModel.findByIdAndUpdate(id, board, {
      new: true,
    });
  }
}
