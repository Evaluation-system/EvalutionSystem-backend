import { IsEmail, IsString, IsNotEmpty} from "@nestjs/class-validator"

export class CreateUserDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    password: string
}
