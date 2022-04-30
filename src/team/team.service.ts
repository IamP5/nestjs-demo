import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamUsersDto } from './dto/get-team-users.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { toTeamUsersDto } from './mapper/team.mapper';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return this.teamRepository.save(createTeamDto);
  }

  async findAll(teamCode: string): Promise<GetTeamUsersDto[]> {
    const teams = !teamCode
      ? await this.teamRepository.find({ relations: ['users', 'users.employee'] })
      : await this.teamRepository.find({ 
        relations: ['users', 'users.employee'],
        where: { code: teamCode }
      })

    return teams.map(team => toTeamUsersDto(team));
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
