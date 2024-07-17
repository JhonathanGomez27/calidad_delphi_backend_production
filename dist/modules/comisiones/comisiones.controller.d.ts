import { ComisionesService } from './comisiones.service';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
import { CreateComisionDto } from './dto/create-comision.dto';
import { UpdateComisionDto } from './dto/update-comision.dto';
export declare class ComisionesController {
    private readonly comisionesService;
    constructor(comisionesService: ComisionesService);
    create(req: any, createComisionDto: CreateComisionDto, res: any): Promise<any>;
    update(req: any, id: string, updateComisionDto: UpdateComisionDto, res: any): Promise<any>;
    comisionPorUsuario(req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
}
