import { Controller, Get } from '@nestjs/common';
import { GisQueriesService } from './gis-queries.service';

@Controller('gis-queries')
export class GisQueriesController {
    constructor(private gisService: GisQueriesService) { }

    @Get('cities')
    async fetchAllCities() {
        return this.gisService.fetchAllCities()
    }
}
