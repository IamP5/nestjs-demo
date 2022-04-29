import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmployeeModule } from 'src/employee/employee.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from 'src/team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EmployeeModule,
    TeamModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
