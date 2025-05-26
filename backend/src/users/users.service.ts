import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username });
    return user || undefined;
  }

  async seedUsers(): Promise<void> {
    await this.userModel.collection.drop().catch(err => {
      if (err.code !== 26) {
        throw err;
      }
    });

    const seedUsers = [
      { username: 'admin', password: '123456' },
      { username: 'user', password: 'qwerty' },
    ];

    await this.userModel.insertMany(seedUsers);
  }
}
