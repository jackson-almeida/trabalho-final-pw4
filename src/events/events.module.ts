import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Events } from './events.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Events]),
    UserModule,
  ],
  exports: [ EventsService ],
  providers: [ EventsService ],
  controllers: [ EventsController ],
})
export class EventsModule {}
