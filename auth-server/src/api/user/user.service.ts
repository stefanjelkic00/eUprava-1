import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Document, ObjectId, Types } from 'mongoose';
import { UserUpdateDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User & Document>,
  ) {}

  async findByUsernameInternal(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(param: Omit<User, '_id'>) {
    return await this.userModel.create(param);
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(
        `Id ${id} is not valid ObjectId`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const ret = await this.userModel.findById(id).exec();
    if (!ret) {
      throw new HttpException(
        `User by id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return ret;
  }

  async findByIdentityNumber(identityNumber: string) {
    const ret = await this.userModel.findOne({ identityNumber }).exec();
    if (!ret) {
      throw new HttpException(
        `User by identityNumber ${identityNumber} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return ret;
  }

  async findByUsername(username: string) {
    const ret = await this.userModel.findOne({ username }).exec();
    if (!ret) {
      throw new HttpException(
        `User by username ${username} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return ret;
  }

  async findByRole(role: string) {
    const ret = await this.userModel.find({ 'roles': role }).exec();
    if (!ret) {
      throw new HttpException(
        `Users by role ${role} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return ret;
  }

  async updateUserById(id: string, user: UserUpdateDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(
        `Id ${id} is not valid ObjectId`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const foundUser = await this.userModel.findById(id).exec();
    await foundUser.update(user).exec();
  }
}
