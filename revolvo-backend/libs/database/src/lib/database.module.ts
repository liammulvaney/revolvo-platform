import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DatabaseType } from 'typeorm';

export type SupportedDBType = Extract<DatabaseType, 'postgres' | 'mysql' | 'mariadb'>;

@Module({})
export class RevolvoBackendDatabaseModule {

  static forRootAsync(options: TypeOrmModuleAsyncOptions): DynamicModule {
    return {
      module: RevolvoBackendDatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync(options)
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
