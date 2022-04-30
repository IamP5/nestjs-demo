import { GetUserDto } from "../dto/get-user.dto";
import { GetUserTeamDto } from "src/user/dto/get-user-team.dto";
import { User } from "../entities/user.entity";
import { Employee } from "src/employee/entities/employee.entity";
import { Team } from "src/team/entities/team.entity";
import { CreateUserDto } from "../dto/create-user.dto";


export const toUser = ({ password }: CreateUserDto, employee: Employee, team: Team) => ({
  username: employee.email.split('@')[0],
  password,
  employee,
  team
} as User);

export const toUserDto = ({ username, employee: { email } }: User) => (
  { username, email } as GetUserDto
);

export const toUserTeamDto = ({ username, employee: { email }, team: { code: teamCode }}: User) => (
  { username, email, teamCode } as GetUserTeamDto
)