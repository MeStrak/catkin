import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupType } from './dto/create-group.dto';
import { Group } from './interfaces/group.interface';
import { GroupInput } from './input-groups.input';

@Injectable()
export class GroupsService {
  constructor(@InjectModel('Group') private groupModel: Model<Group>) {}

  async create(createGroupDto: GroupInput): Promise<Group> {
    const createdGroup = new this.groupModel(createGroupDto);
    return await createdGroup.save();
  }

  async findAll(groups: string[]): Promise<Group[]> {
    return await this.groupModel.find({ _id: groups }).exec();
  }

  async findOne(id: string, groups: string[]): Promise<Group> {
    return await this.groupModel.findOne({
      $and: [{ _id: id }, { _id: { $in: groups } }],
    });
  }

  async delete(id: string): Promise<Group> {
    return await this.groupModel.findByIdAndRemove(id);
  }

  async update(id: string, group: Group): Promise<Group> {
    return await this.groupModel.findByIdAndUpdate(id, group, {
      new: true,
    });
  }
}
