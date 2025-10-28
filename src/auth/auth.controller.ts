import {
    Body, Controller, HttpCode, HttpStatus, Post, Request,
    UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }
     @Post('login')
    async Login(@Body() LoginDto: Record<string, any>) {
        return this.authService.login(LoginDto.email, LoginDto.password);
    }


}
