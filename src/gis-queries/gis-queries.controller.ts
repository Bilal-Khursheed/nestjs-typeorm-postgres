import { Controller, Get, Query } from '@nestjs/common';
import { GisQueriesService } from './gis-queries.service';

@Controller('gis-queries')
export class GisQueriesController {
    constructor(private gisService: GisQueriesService) { }

    @Get('cities')
    async fetchAllCities(@Query() query) {
        const { lngWest, latSouth, lngEast, latNorth } = query;
        return this.gisService.fetchAllCities(lngWest, latSouth, lngEast, latNorth)
    }
    @Get('geojson')
    async fetchCitiesGeoJson(@Query() query) {
        const { lngWest, latSouth, lngEast, latNorth } = query;
        return this.gisService.fetchAllCitiesGeoJson(lngWest, latSouth, lngEast, latNorth)
    }
}
