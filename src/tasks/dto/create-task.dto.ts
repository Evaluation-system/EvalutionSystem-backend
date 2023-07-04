import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    task: string

    @IsInt()
    @IsNotEmpty()
    time: any
}
