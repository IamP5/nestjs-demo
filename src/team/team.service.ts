import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamUsersDto } from './dto/get-team-users.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return this.teamRepository.save(createTeamDto);
  }

  async findAll(): Promise<GetTeamUsersDto[]> {
    const teams = await this.teamRepository.find({ relations: ['users', 'users.employee'] });

    return teams.map(({ name, code, users }) => (
      {
        name,
        code,
        users: users.map(({ username, employee }) => ({ username, email: employee.email } as GetUserDto))
      } as GetTeamUsersDto)
    )
  }

  findOne(id: number) {
    return this.teamRepository.findOne(id);
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamRepository.delete(id);
  }
}
