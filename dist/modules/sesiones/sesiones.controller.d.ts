import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
import { SesionesService } from './sesiones.service';
import { CreateSesionDto } from './dto/create-sesion.dto';
export declare class SesionesController {
    private readonly sesionesService;
    constructor(sesionesService: SesionesService);
    create(req: any, createSesionDto: CreateSesionDto, res: any): Promise<any>;
    finSesionesByComision(comisionId: number, req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
    findAll(req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
    updateSesionStatus(sesionId: number, req: any, res: any): Promise<any>;
    setUsersToSesion(req: any, res: any, body: any, sesionId: number): Promise<any>;
    deleteSesion(req: any, id: number, res: any): Promise<any>;
    prueba(req: any, res: any): Promise<any>;
    listarSesionesRevisadas(req: any, prefijo: string, res: any): Promise<any>;
    getTranscripcionesSesion(req: any, query: any, res: any): Promise<any>;
    sincronizarSesion(req: any, body: any, res: any): Promise<any>;
}
