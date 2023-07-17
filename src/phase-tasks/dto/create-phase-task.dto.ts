import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreatePhaseTaskDto {    
    @IsString()
    @IsNotEmpty()
    titleTask: string

    @IsString()
    @IsNotEmpty()
    descriptionTask: string

    @IsString()
    @IsNotEmpty()
    roleEmployee: string

    @IsInt()
    @IsNotEmpty()
    starTask: any

    @IsInt()
    @IsNotEmpty()
    endTask: any
}
