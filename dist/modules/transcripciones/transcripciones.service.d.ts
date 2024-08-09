import { Usuario } from '../usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { Log } from '../logs/entities/logs.entity';
import { Transcripcion } from './entities/transcription.entity';
import { Sesion } from '../sesiones/entities/sesion.entity';
export declare class TranscripcionesService {
    private usuarioRepository;
    private logRepository;
    private transcripcionRepository;
    private sesionRepository;
    constructor(usuarioRepository: Repository<Usuario>, logRepository: Repository<Log>, transcripcionRepository: Repository<Transcripcion>, sesionRepository: Repository<Sesion>);
    getTranscriptionsBySesion(usuarioLogueado: Usuario, idSesion: number, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        sesion?: undefined;
        transcripciones?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        sesion: Sesion;
        transcripciones: Transcripcion[];
        total: number;
        message?: undefined;
    }>;
    getAllTranscripctionsBySesion(usuarioLogueado: Usuario, idSesion: number, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        sesion?: undefined;
        transcripciones?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        sesion: Sesion;
        transcripciones: Transcripcion[];
        total: number;
        message?: undefined;
    }>;
    getTranscripcionesRevisadas(usuarioLogueado: Usuario, idSesion: number, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        sesion?: undefined;
        transcripciones?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        sesion: Sesion;
        transcripciones: Transcripcion[];
        total: number;
        message?: undefined;
    }>;
    getTranscripcionesPendientes(usuarioLogueado: Usuario, idSesion: number, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        sesion?: undefined;
        transcripciones?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        sesion: Sesion;
        transcripciones: Transcripcion[];
        total: number;
        message?: undefined;
    }>;
    updateTranscripcionRevisada(usuarioLogueado: Usuario, id: number, data: any): Promise<{
        ok: boolean;
        message: string;
    }>;
}
