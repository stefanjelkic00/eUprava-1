import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(param: Omit<User, '_id'>) {
    return await this.userModel.create(param);
  }
}
