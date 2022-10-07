import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GisCityEntity } from './entities/gis-queries.entity';

@Injectable()
export class GisQueriesService {
    constructor(
        @InjectRepository(GisCityEntity)
        private GisRepository: Repository<GisCityEntity>) { }

    async fetchAllCities(): Promise<GisCityEntity[] | { data: GisCityEntity[], msg: string , success : boolean}> {
        let response = await this.GisRepository.query('select gid,region,postcode,address,st_asgeojson(geom) as cordinates from newyork_points')
        if (!response) {
            return {
                success: false,
                msg: 'No record found for cities.',
                data: []
            }
        }
        return {
            success: true,
            msg: 'Cities are fetched successfully.',
            data: response || []
        }
    }
}
