import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserInput } from './input-users.input';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(createUserDto: UserInput): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }

    async update(id: string, user: UserInput): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, {
            new: true,
        });
    }
}
