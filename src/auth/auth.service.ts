import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {

    }
    async login(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if (!user) {
            throw new UnauthorizedException('Sai thông tin đăng nhập !');
        }

        if (user?.password === password) {
            const payload = {
                sub: user.userId, email: user.email
            };
            return {
                access_token: await this.jwtService.signAsync(payload)

            }

        } else {
            throw new UnauthorizedException('Sai thông tin đăng nhập rồi !');
        }
    }
    
}
