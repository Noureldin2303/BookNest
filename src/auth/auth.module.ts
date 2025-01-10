import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/users.module';
import { AuthController } from './auth.controller';
import configurations from 'config/configurations';
import { GoogleStrategy } from './common/google.strategy';
import { SessionSerializer } from './common/session.serializer';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: configurations().jwt.secret,
      signOptions: { expiresIn: configurations().jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
