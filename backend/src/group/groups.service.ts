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

  async findAll(groups: string[], publicOnly?: boolean): Promise<Group[]> {
    if (publicOnly !== undefined && publicOnly) {
      return await this.groupModel.find({ security: 'PUBLIC' }).exec();
    } else {
      return await this.groupModel
        .find({ $or: [{ _id: groups }, { security: 'PUBLIC' }] })
        .exec();
    }
  }

  async findOne(id: string, groups: string[]): Promise<Group> {
    return await this.groupModel.findOne({
      $and: [{ _id: id }, { _id: { $in: groups } }],
    });
  }

  async getPublicGroupIds(): Promise<string[]> {
    return await this.groupModel.find({ security: 'PUBLIC' }).distinct('_id');
  }

  async delete(id: string): Promise<Group> {
    return await this.groupModel.findByIdAndRemove(id);
  }

  async update(id: string, group: GroupInput): Promise<Group> {
    return await this.groupModel.findByIdAndUpdate(id, group, {
      new: true,
    });
  }

  async isGroupPublic(groupId: string): Promise<boolean> {
    const isPublic =
      (await this.groupModel.count({
        $or: [{ security: 'PUBLIC' }, { id: groupId }],
      })) >= 0;
    return isPublic;
  }
}
