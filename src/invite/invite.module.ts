import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsService } from '../events/events.service';
import { InviteController } from './invite.controller';
import { UserService } from '../user/user.service';
import { InviteService } from './invite.service';
import { Invite } from './invite.entity';
import { EventsModule } from '../events/events.module';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Invite]),
    EventsModule,
    UserModule,
  ],
  providers: [
    InviteService,
  ],
  controllers: [InviteController],
})
export class InviteModule {}