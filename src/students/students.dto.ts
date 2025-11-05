import { IsNotEmpty, IsString } from "class-validator";

export class StudentDto {
    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    studentCode: string;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    dateOfBirth: Date;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    gender: string;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    address: string;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    hometown: string;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống ' })
    major: string;


}