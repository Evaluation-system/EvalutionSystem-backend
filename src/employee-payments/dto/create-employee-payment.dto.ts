import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateEmployeePaymentDto {
    @IsString()
    @IsNotEmpty()
    employee: string

    @IsInt()
    @IsNotEmpty()
    salary: any
}
