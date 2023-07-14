import { IsEmail, IsString, IsNotEmpty} from "@nestjs/class-validator"

export class CreateUserDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}
