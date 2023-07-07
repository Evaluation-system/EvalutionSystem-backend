import { IsString, IsNotEmpty} from "@nestjs/class-validator"

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string

    
    @IsString()
    @IsNotEmpty()
    description: string
}
