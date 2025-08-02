import { Module } from '@nestjs/common';
import { JwtStrategyService } from './services/jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';


/**
 * RevolvoJWTBackendAuthenticationModule
 * This module provides JWT authentication capabilities for the Revolvo backend.
 * It registers the 'JwtStrategyService' and configures the JWT module with options.
 */
@Module({})
export class RevolvoJWTBackendAuthenticationModule {
  static register(jwtOptions: JwtModuleOptions) {
    return {
      module: RevolvoJWTBackendAuthenticationModule,
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register(jwtOptions),
      ],
      providers: [JwtStrategyService],
      exports: [JwtStrategyService]
    };
  }

}
