import { Invite } from '../invite/invite.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  initialDatetime: Date;

  @Column()
  finalDatetime: Date;

  @OneToMany(() => Invite, invite => invite.event)
  invites: Invite[];

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
