import { Employee } from 'src/employee/entities/employee.entity';
import { Team } from 'src/team/entities/team.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Employee)
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Team, team => team.users)
  team: Team;
}
