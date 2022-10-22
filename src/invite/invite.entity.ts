import { Events } from '../events/events.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

export enum InviteStatus {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PENDING = 'pending'
}

@Entity()
export class Invite {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.invites, { eager: true })
  guestUser: User;
  
  @ManyToOne(() => Events, event => event.invites, { eager: true })
  event: Events;

  @Column({
    type: 'enum',
    enum: InviteStatus,
    default: InviteStatus.PENDING
  })
  status: InviteStatus;
}
