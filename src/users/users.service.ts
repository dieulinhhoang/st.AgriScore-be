//Xử lý logic, tương tác với database
import { CreateDtoUser } from './user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/index';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(CreateDtoUser: CreateDtoUser) {
        const passwordHash = await bcrypt.hash(CreateDtoUser.password, 10) //2^10 -lap 10 lan --> tang do bao mat 
        //create
        const newUser = new this.userModel({
            ...CreateDtoUser,
            passwordHash: passwordHash,
        })
        return newUser.save();
    }
    async findAll() {
        return this.userModel.find()
            .select('-passwordHash') // ko lay password
            .select('-username')
            .select('-createdAt')
            .select('-updatedAt')
            .select('-isActive')
            .select('-_id')
            .select('-__v')
            .exec();
    }

    async findOne(id: string) {
        return this.userModel.findById(id)
            .select('-passwordHash')
            .exec();
    }

    async findbyUserName(username: string) {
        return this.userModel.findOne({ username }).exec();
    }
    async findbyUsernamAndPassword(username: string, password: string) {

    }
    // update 
    async update(id: string, updateData: any) {
        return this.userModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select('-passwordHash').exec();
    }
    //remove

    async remove(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
    // tk

    async search(key: string) {
        return this.userModel.find({
            $or: [
                { username: { $regex: key, $option: 'i' } }, //$option:'i' ko phan biet chu hoa chu thuong 
                { email: { $regax: key, $option: 'i' } },
                { fullName: { $regax: key, $option: 'i' } }
            ]
        }).select('-passwordHash').exec();
    }
    async count() {
        return this.userModel.countDocuments().exec();
    }
}
