import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JwtUser } from '../decorators/user.decorator';
import { InviteDto } from '../dto/invite.dto';
import { Invite } from './invite.entity';
import { InviteService } from './invite.service';

@Controller('invite')
export class InviteController {

  constructor(
    private inviteService: InviteService,
  ) {}

  @Get()
  findAll(@JwtUser() user): Promise<Invite[]> {
    return this.inviteService.getAllByUser(user.userId);
  }

  @Post()
  create(@Body() inviteDto: InviteDto) {
    return this.inviteService.createInvite(inviteDto);
  }

  @Put(':id/accept')
  acceptInvite(@Param('id') id: number) {
    return this.inviteService.acceptInvite(id);
  }

  @Put(':id/reject')
  rejectInvitation(@Param('id') id: number) {
    return this.inviteService.rejectInvite(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.inviteService.deleteInvite(id);
  }
}