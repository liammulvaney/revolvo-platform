import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, RevolvoJWTBackendAuthenticationModule } from '@revolvo-backend/authentication';
import path from 'path';

// Ensure the environment variables are loaded from the .env file
const envFilePath = path.resolve(__dirname, '../../../env/.env');

@Module({
  // to propose a dynamic module that can be used to configure the basic api setup
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
      envFilePath, // Load environment variables from .env file
    }), 
    // set up the authentication module with JWT options
    RevolvoJWTBackendAuthenticationModule.register({
      signOptions: { expiresIn: '1h' },
      privateKey: process.env.PRIVATE_JWT_KEY_DIRECTORY || 'test', // Use your private key directory
      publicKey: process.env.PUBLIC_JWT_KEY_DIRECTORY || 'test', // Use your public key directory
    })
],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AppService
  ],
})
export class AppModule {}
