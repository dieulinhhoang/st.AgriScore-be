import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()

export class UsersService {
    private readonly user = [
        {
            userId: 1,
            email: 'admin@gmail.com',
            password: '12345678qQ',
        },
        {
            userId: 2,
            email: 'john@gmail.com',
            password: '123456aA',
        }
    ]
    async findOne(email: string): Promise<User | undefined> {
        return this.user.find(user => user.email === email)
    }
}
