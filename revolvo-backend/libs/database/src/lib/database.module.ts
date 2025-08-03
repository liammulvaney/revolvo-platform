import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';


export type DBOptions = {
  type: 'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mongodb',
  database: string,
  host: string,
  port: number,
  username: string,
  password: string,
  synchronize: boolean, // Optional, default is false in production
}

@Module({})
export class RevolvoBackendDatabaseModule {

  static forRootAsync(options: DBOptions): DynamicModule {
    return {
      module: RevolvoBackendDatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports:[ ConfigModule ],
          inject: [ConfigService],
          useFactory: async () => ({
            ...options
          })
        })
      ]
    }
   }

   static forFeature(entities?: EntityClassOrSchema[]): DynamicModule {
    return {
      module: RevolvoBackendDatabaseModule,
      imports: [
        TypeOrmModule.forFeature(entities) // Add your entities here
      ]
    };
  }

}
