import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/index';

@Injectable()
export class UsersService {
  
  // Inject UserModel vào constructor:
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

   async findOne(usernameOrEmail: string): Promise<User | undefined> {
    // Tìm bằng cả username hoặc email
    return this.userModel
      .findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      )
    }.exec(); 
}
