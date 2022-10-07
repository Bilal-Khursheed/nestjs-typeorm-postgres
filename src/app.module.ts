import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './config/typeorm.config';
import { UserEntity } from './user/entities/user.entity';
import { GisQueriesModule } from './gis-queries/gis-queries.module';


@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeOrmConfigs), TypeOrmModule.forFeature([UserEntity]), GisQueriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
