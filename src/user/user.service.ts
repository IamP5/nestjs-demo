import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import { Employee } from 'src/employee/entities/employee.entity';
import { Team } from 'src/team/entities/team.entity';
import { GetUserTeamDto } from './dto/get-user-team.dto';
import { toUser, toUserTeamDto } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, employeeId, teamCode } = createUserDto;

    const employee = await this.employeeRepository.findOne(employeeId);
    const team = await this.teamRepository.findOne({ where: { code: teamCode } });

    const user = this.userRepository.save(toUser(createUserDto, employee, team));
    
    return user;
  }

  async findAll(username: string): Promise<GetUserTeamDto[]> {
    const users = !username
      ? await this.userRepository.find({ relations: ['team', 'employee'] })
      : await this.userRepository.find({
        relations: ['team', 'employee'],
        where: { username }
      });
   
    return users.map(user => toUserTeamDto(user));
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
