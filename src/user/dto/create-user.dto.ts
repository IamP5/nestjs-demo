import { Type } from "class-transformer";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {

  @Type(() => String)
  @IsString()
  @Length(8, 32)
  password: string;

  @Type(() => Number)
  @IsNumber()
  employeeId: number;

  @IsString()
  @Length(2, 8)
  teamCode: string;
}
