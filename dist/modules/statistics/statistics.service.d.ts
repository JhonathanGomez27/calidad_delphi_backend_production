import { Repository } from 'typeorm';
import { Sesion } from '../sesiones/entities/sesion.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Comision } from '../comisiones/entities/comision.entity';
import { Transcripcion } from '../transcripciones/entities/transcription.entity';
export declare class StatisticsService {
    private sesionRepository;
    private usuarioRepository;
    private comisionesRepository;
    private transcripcionRepository;
    constructor(sesionRepository: Repository<Sesion>, usuarioRepository: Repository<Usuario>, comisionesRepository: Repository<Comision>, transcripcionRepository: Repository<Transcripcion>);
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
}
