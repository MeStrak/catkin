import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ItemType } from './dto/create-item.dto';
import { Item } from './interfaces/item.interface';
import { ItemInput } from './input-items.input';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private itemModel: Model<Item>) {}

  async create(createItemDto: ItemInput): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }

  async findAll(groups: string[], boards?: string[]): Promise<Item[]> {
    return await this.itemModel.find({ group: { $in: groups } }).exec();
  }

  async findOne(id: string, groups: string[]): Promise<Item> {
    return await this.itemModel.findOne({ _id: id, group: { $in: groups } });
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
