import { GetUserDto } from "src/user/dto/get-user.dto";
import { toUserDto } from "src/user/mapper/user.mapper";
import { GetTeamUsersDto } from "../dto/get-team-users.dto";
import { GetTeamDto } from "../dto/get-team.dto";
import { Team } from "../entities/team.entity";

export const toTeamUsersDto = ({ name, code, users }: Team) => (
  { name, code, users: users.map(user => toUserDto(user)) } as GetTeamUsersDto
);

export const toTeamDto = ({ name, code }: Team) => ({ name, code } as GetTeamDto);