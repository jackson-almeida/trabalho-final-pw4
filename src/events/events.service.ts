import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';

import { CreateEventDto } from '../dto/create-event.dto';
import { Events } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
    private userService: UserService,
  ) {}

  async getAll(): Promise<Events[]> {
    return this.eventsRepository.find();
  }

  async getById(id: number): Promise<Events> {
    return this.eventsRepository.findOne({where: {id: id}});
  }

  async getAllByUser(id: number): Promise<Events[]> {
    return this.eventsRepository.find({ where: { id: id } });
  }

  async createEvent( userId: number, createEventDto: CreateEventDto ): Promise<Events> {
    const event = new Events();
    Object.assign(event, createEventDto);

    const user = await this.userService.getById(userId);
    event.user = user;

    return this.eventsRepository.save(event);
  }

  async editEvent(id: number, createEventDto: CreateEventDto): Promise<Events> {
    const event = await this.eventsRepository.findOne({where: {id: id}});
    event.name = createEventDto.eventname;
    event.description = createEventDto.description;
    event.initialDatetime = createEventDto.initialDatetime;
    event.finalDatetime = createEventDto.finalDatetime;
    return this.eventsRepository.save(event);
  }

  async deleteEvent(id: number): Promise<any> {
    return this.eventsRepository.delete(id);
  }
}