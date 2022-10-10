import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GisCityEntity } from './entities/gis-queries.entity';
import { NewyorkParcelsPloygonEntity } from './entities/newyork-parcels-polygon.entity';
import { GisQueriesController } from './gis-queries.controller';
import { GisQueriesService } from './gis-queries.service';

@Module({
  imports:[TypeOrmModule.forFeature([GisCityEntity, NewyorkParcelsPloygonEntity])],
  controllers: [GisQueriesController],
  providers: [GisQueriesService]
})
export class GisQueriesModule {}
