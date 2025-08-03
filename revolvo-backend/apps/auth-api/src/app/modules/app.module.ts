import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard, RevolvoJWTBackendAuthenticationModule } from '@revolvo-backend/authentication';
import { RevolvoBackendDatabaseModule, SupportedDBType } from '@revolvo-backend/database'; // Import the database module
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
    // add the database module
    RevolvoBackendDatabaseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<SupportedDBType>('DBTYPE') || 'postgres', // Default to 'postgres' if not set
        port: parseInt(configService.get<string>('DB_PORT') || '5432'),
        database: configService.get<string>('AUTH_DB_NAME'),
        host: configService.get<string>('AUTH_DB_HOST'),
        username: configService.get<string>('AUTH_DB_USER'),
        password: configService.get<string>('AUTH_DB_PASSWORD'),
        synchronize: true,
        pool: {
          max: parseInt(configService.get<string>('DB_MAX_POOL_SIZE') || '10'),
          min: parseInt(configService.get<string>('DB_MIN_POOL_SIZE') || '2'),
          acquireTimeoutMillis: parseInt(configService.get<string>('DB_ACQUIRE_TIMEOUT') || '30000'),
        },
      }),
      inject: [ConfigService], // Inject ConfigService to access environment variables
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
