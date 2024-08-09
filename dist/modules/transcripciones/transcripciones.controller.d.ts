import { TranscripcionesService } from './transcripciones.service';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
export declare class TranscripcionesController {
    private readonly transcripcionesService;
    constructor(transcripcionesService: TranscripcionesService);
    getTranscripcionesBySesion(sesionId: number, req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
    getAllTranscripcionesBySesion(sesionId: number, req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
    getTranscripcionesPendientesBySesion(sesionId: number, req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
    getTranscripcionesRevisadasBySesion(sesionId: number, req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
    updateTranscripcionRevisada(transcripcionId: number, req: any): Promise<{
        ok: boolean;
        message: string;
    }>;
}
