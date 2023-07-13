import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreatePhaseTaskDto {    
    @IsString()
    @IsNotEmpty()
    task: string

    @IsInt()
    @IsNotEmpty()
    duration: any

    @IsInt()
    @IsNotEmpty()
    price: any
}
