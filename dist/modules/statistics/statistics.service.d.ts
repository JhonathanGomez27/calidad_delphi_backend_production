import { Repository } from 'typeorm';
import { Sesion } from '../sesiones/entities/sesion.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Comision } from '../comisiones/entities/comision.entity';
import { Transcripcion } from '../transcripciones/entities/transcription.entity';
import { DateUtilsService } from 'src/utils/date-utils.service';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
export declare class StatisticsService {
    private sesionRepository;
    private usuarioRepository;
    private comisionesRepository;
    private transcripcionRepository;
    private readonly dateUtilsService;
    constructor(sesionRepository: Repository<Sesion>, usuarioRepository: Repository<Usuario>, comisionesRepository: Repository<Comision>, transcripcionRepository: Repository<Transcripcion>, dateUtilsService: DateUtilsService);
    getStatistics(user: Usuario, query: any): Promise<{
        ok: boolean;
        message: string;
        usuarios: any[];
        total: number;
        error?: undefined;
    } | {
        ok: boolean;
        message: string;
        error: any;
        usuarios?: undefined;
        total?: undefined;
    }>;
    getStatisticsFilter(user: Usuario, query: any): Promise<{
        ok: boolean;
        message: string;
        usuarios: any[];
        total: number;
        error?: undefined;
    } | {
        ok: boolean;
        message: string;
        error: any;
        usuarios?: undefined;
        total?: undefined;
    }>;
    getTranscriptionsEditedByUser(query: FiltersPaginatedQuery): Promise<{
        ok: boolean;
        message: string;
        sesiones?: undefined;
        total?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        message: string;
        sesiones: unknown[];
        total: number;
        error?: undefined;
    } | {
        ok: boolean;
        message: string;
        error: any;
        sesiones?: undefined;
        total?: undefined;
    }>;
    getStisticsByUser(query: FiltersPaginatedQuery): Promise<{
        ok: boolean;
        message: string;
        error: any;
    }>;
}
