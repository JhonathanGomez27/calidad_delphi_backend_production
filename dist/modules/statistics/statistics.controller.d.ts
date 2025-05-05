import { StatisticsService } from './statistics.service';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getStatistics(req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
    getStatisticsByUser(query: FiltersPaginatedQuery, res: any): Promise<any>;
}
