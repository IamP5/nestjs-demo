import { IsString, Length } from "class-validator";

export class CreateTeamDto {

  @IsString()
  @Length(3, 60)
  name: string;

  @IsString()
  @Length(2, 8)
  code: string;
}
