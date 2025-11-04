import { UsersService } from './users.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    //Nhận request từ client, gọi service, trả về response

    constructor(private readonly UsersService:UsersService){}

    @Get()
    async findAll(@Query('search') search?:string){
        if(search){
            return this.UsersService.search(search)
        }
        return this.findAll();
    }
}
