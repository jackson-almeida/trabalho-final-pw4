import { Events } from "src/events/events.entity";
import { Invite } from "src/invite/invite.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 40, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => Events, (events) => events.user)
  events: Events[];

  @OneToMany(() => Invite, (invites) => invites.guestUser)
  invites: Invite[];

}
