import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { JwtUser } from '../decorators/user.decorator';
import { CreateEventDto } from '../dto/create-event.dto';
import { Events } from './events.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService
  ) {}

  @Get()
  async getAll(@JwtUser() user): Promise<Events[]> {
    return this.eventsService.getAllByUser(user.userId);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Events> {
    return this.eventsService.getById(id);
  }

  @Post()
  async create(@JwtUser() user, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(user.userId, createEventDto);
  }

  @Post(':id')
  async editEvent(@Param('id') id: number, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.editEvent(id, createEventDto);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number): Promise<any> {
    return this.eventsService.deleteEvent(id);
  }
}
