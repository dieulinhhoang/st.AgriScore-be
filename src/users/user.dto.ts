import { IsNotEmpty, IsString, MinLength } from "class-validator";

// validate du lieu 
export class CreateDtoUser {
    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    @MinLength(4, { message: 'Phải nhập tối thiểu 4 ký tự ' })
    username: string;


    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    @MinLength(8, { message: 'Mật khẩu phải gồm 8 ký tự ' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống' })
    @MinLength(5, { message: 'Vui lòng nhập đầy đủ họ và tên của bạn' })
    fullname: string;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống' })
    phone: string;

    @IsString()
    @IsNotEmpty()
    role: string;



}