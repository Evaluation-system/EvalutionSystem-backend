import { IsEmail, IsString, IsNotEmpty} from "@nestjs/class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}
