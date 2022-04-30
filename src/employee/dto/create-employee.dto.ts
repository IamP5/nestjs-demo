import { IsEmail, IsString, Length, min } from "class-validator";

export class CreateEmployeeDto {

  @IsString()
  @Length(3, 40)
  name: string;

  @IsEmail()
  email: string;
}
