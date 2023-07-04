import { IsEmail, IsString, IsNotEmpty} from "@nestjs/class-validator"
import { IsInt } from "class-validator"

export class CreateProcingDto {
    @IsString()
    @IsNotEmpty()
    cost: string

    @IsInt()
    @IsNotEmpty()
    value: any
}
