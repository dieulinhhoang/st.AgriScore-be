import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsString()
    @IsNotEmpty({message:'Không được để trống !'})
    email:string ;

    @IsString()
    @IsNotEmpty({message:'Không được để trống !'})
    password:string;
}