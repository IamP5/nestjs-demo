import { GetUserDto } from "src/user/dto/get-user.dto";
import { GetTeamDto } from "./get-team.dto";

export class GetTeamUsersDto extends GetTeamDto {
  users: GetUserDto[];
}