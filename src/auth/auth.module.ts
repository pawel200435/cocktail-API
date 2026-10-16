import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { StringValue } from 'ms';

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

if (!jwtExpiresIn) {
  throw new Error('JWT_EXPIRES_IN environment variable is not defined');
}


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({secret: jwtSecret, signOptions: { expiresIn: jwtExpiresIn as StringValue }}),
    ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
