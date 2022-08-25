import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  createUser = async (user: User): Promise<UserDocument> => {
    const pass = user.password;

    const password = await bcrypt.hash(pass, 10);

    return this.userModel
      .create({ ...user, password })
      .then((user) => user)
      .catch((err) => {
        throw new BadRequestException(err);
      });
  };

  login = async (user: User) => {
    const { username, password } = user;

    const exists = this.userModel
      .findOne({ username })
      .then(async (user: any) => {
        if (!user) {
          throw new BadRequestException('User not found');
        }
        const pass = user.password;

        const valid = await bcrypt.compare(password, pass).then((res) => {
          return res;
        });

        if (valid) {
          return {
            username: user.username,
            _id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        } else {
          throw new BadRequestException('Invalid password');
        }
      });

    return exists;
  };

  changeUsername = (username: string, id: string) => {
    return this.userModel
      .findByIdAndUpdate(id, { username }, { new: true })
      .then((user) => user)
      .catch((err) => {
        throw new BadRequestException(err);
      });
  };
}
