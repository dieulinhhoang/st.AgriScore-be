import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../auth/login.dto'
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private userService: UsersService,
        private jwtService: JwtService
    ) {

    }
    async login(loginDto: LoginDto) {
        // tìm user
        const user = await this.userModel.findOne(
            {
                email: loginDto.email
            }
        )
        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng  !');
        }
        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.passwordHash
        )
        if (!isPasswordValid) {
            throw new UnauthorizedException('Sai mật khẩu !')
        }
        //jwt token 
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,

        }
        const accecssToken = this.jwtService.sign(payload);
        return {
            message: 'Đăng Nhập Thành Công !',
            accessToken: accecssToken,
            user: {
                id: user.id,
                username: user.username,
                fullname: user.fullName,
                email: user.email,
                role: user.role
            }

        }
    }

    //validate user 

    async validateUser(id: string) {
        const user = await this.userModel.findById(id)
            .select('-passwordHash');

        if (!user) {
            throw new UnauthorizedException('Tài Khoản Không Tồn Tại !');
        }
        return user;
    }
}
