import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  exports: [ AuthService, JwtModule ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
})
export class AuthModule {}
