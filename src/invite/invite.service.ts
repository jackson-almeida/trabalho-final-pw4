import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventsService } from '../events/events.service';
import { UserService } from '../user/user.service';
import { InviteDto } from '../dto/invite.dto';
import { Invite } from './invite.entity';

@Injectable()
export class InviteService {

  constructor(    
    @InjectRepository(Invite)
    private inviteRepository: Repository<Invite>,

    private eventService: EventsService,
    private userService: UserService
  ) {}

  async getAllByUser(id: number): Promise<Invite[]> {
    return this.inviteRepository.find({ where: { guestUser: { id: id }}});
  }

  async createInvite(inviteDto: InviteDto): Promise<Invite | String> {
    const userGuest = await this.userService.getByUserEmail(inviteDto.guestUserEmail);
    if (!!userGuest) {
      const invite = new Invite();
      invite.guestUser = userGuest;
      invite.event = await this.eventService.getById(inviteDto.event);
      return this.inviteRepository.save(invite);
    }
  }

  async acceptInvite(id: number) {
    const invite: any = await this.inviteRepository.findOne({where: {id: id}});
    invite.status = "accepted";
    return this.inviteRepository.save(invite);
  }

  async rejectInvite(id: number) {
    const invite: any = await this.inviteRepository.findOne({where: {id: id}});
    invite.status = "rejected";
    return this.inviteRepository.save(invite);
  }

  async deleteInvite(id: number): Promise<any> {
    return this.inviteRepository.delete(id);
  }

}