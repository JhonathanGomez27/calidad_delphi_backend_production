import { LogsService } from './logs.service';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    getLogs(req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
}
