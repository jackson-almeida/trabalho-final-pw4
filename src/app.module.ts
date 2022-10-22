import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './user/user.entity';
import { Events } from './events/events.entity';
import { EventsModule } from './events/events.module';
import { InviteModule } from './invite/invite.module';
import { Invite } from 'src/invite/invite.entity';


@Module({
  imports: [
  UserModule,
    EventsModule,
    AuthModule,
    InviteModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:  process.env.DB_HOST,
      port: <number><unknown>process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: [User, Events, Invite],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
