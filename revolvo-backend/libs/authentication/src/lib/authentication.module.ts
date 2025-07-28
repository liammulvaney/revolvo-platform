import { Module } from '@nestjs/common';
import { JwtStrategyService } from './services/jwt-strategy.service';
//import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategyService],
  exports: [JwtStrategyService],
})
export class RevolvoBackendAuthenticationModule {}
