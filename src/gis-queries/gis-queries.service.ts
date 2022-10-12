import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GisCityEntity } from './entities/gis-queries.entity';
import { NewyorkParcelsPloygonEntity } from './entities/newyork-parcels-polygon.entity';

@Injectable()
export class GisQueriesService {
    constructor(
        @InjectRepository(GisCityEntity)
        private GisRepository: Repository<GisCityEntity>,
        @InjectRepository(NewyorkParcelsPloygonEntity)
        private newyorkParcelPolygon: Repository<NewyorkParcelsPloygonEntity>) { }

    async fetchAllCities(lngWest, latSouth, lngEast, latNorth): Promise<GisCityEntity[] | { data: { pointData?: {}, polygonData?: {} }, msg: string, success: boolean }> {


        // let response = await this.GisRepository.query(`select gid,region,postcode,address,st_asgeojson(geom) as cordinates from newyork_points limit 100000`);
        // let fetchPolygons = await this.newyorkParcelPolygon.query(`select  id, st_asgeojson(st_transform(geom, 4326)) as cordinates FROM newyork_parcels_polygon limit ${limit} offset ${offset};`);
        let fetchPolygons = await this.newyorkParcelPolygon.query(`select id, st_asgeojson(st_transform(geom, 4326)) as cordinates from newyork_parcels_polygon where
        ST_Intersects(geom  ,st_transform(ST_MakeEnvelope(${lngWest},${latSouth},${lngEast},${latNorth}, 4326),3857));`);
        // let totalPolygon = await this.newyorkParcelPolygon.count({});
        /**
         * manipulate points
         * 1: center point,
         * 2: points with lng lat
         * 
         */
        // if (!response) {
        //     return {
        //         success: false,
        //         msg: 'No record found for cities.',
        //         data: {}
        //     }
        // }
        // let lat = 0, lng = 0;
        // for (let x = 0; x <= response.length; x++) {

        //     if (response[x] && response[x].cordinates) {
        //         const parsedData = JSON.parse(response[x].cordinates);
        //         lng += parsedData.coordinates[0];
        //         lat += parsedData.coordinates[1]
        //     }
        // }
        // lat /= response.length;
        // lng /= response.length

        // let pointData = {
        //     centerPoints: {
        //         lat,
        //         lng
        //     },
        //     mapPoints: response && response.length && response.map(item => {
        //         const parsedData = JSON.parse(item.cordinates);
        //         return {
        //             region: item.region,
        //             postcode: item.postcode,
        //             address: item.address,
        //             cordinates: { lng: parsedData?.coordinates[0], lat: parsedData?.coordinates[1] }
        //         }
        //     })

        // }
        /**
         * Manipulate polygon data
         */
        fetchPolygons = fetchPolygons && fetchPolygons.map(item => {
            const parsedData = JSON.parse(item.cordinates);
            let coordinates = parsedData && parsedData.coordinates[0][0].map(item => {
                return { lng: item[0], lat: item[1] }
            });
            return {
                type: parsedData.type || 'Hello',
                coordinates
            }

        })
        return {
            success: true,
            msg: 'Cities are fetched successfully.',
            data: { polygonData: { polygons: fetchPolygons } } || {}
        }
    }

    async fetchAllCitiesGeoJson(lngWest, latSouth, lngEast, latNorth) {
        try {
            let fetchPolygons = await this.newyorkParcelPolygon.query(`SELECT ST_asGeoJson(ST_Collect(st_transform(geom, 4326))) as cord FROM newyork_parcels_polygon  where
            ST_Intersects(geom  ,st_transform(ST_MakeEnvelope(${lngWest},${latSouth},${lngEast},${latNorth}, 4326),3857));`);
            return {
                success: true,
                msg: 'Cities are fetched successfully.',
                data: fetchPolygons && fetchPolygons.length && JSON.parse(fetchPolygons[0].cord) || {}
            }
        } catch (error) {
            console.log("ERROR while fetchAllCitiesGeoJson==>> ", error)
        }
    }
}
