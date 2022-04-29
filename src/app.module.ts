import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UserModule,
    EmployeeModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
