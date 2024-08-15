import { Sesion } from './entities/sesion.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Comision } from '../comisiones/entities/comision.entity';
import { Log } from '../logs/entities/logs.entity';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { Transcripcion } from '../transcripciones/entities/transcription.entity';
import { TelegramService } from '../telegram/telegram.service';
export declare class SesionesService {
    private sesionRepository;
    private usuarioRepository;
    private comisionesRepository;
    private transcripcionRepository;
    private logsRepository;
    private readonly telegramService;
    constructor(sesionRepository: Repository<Sesion>, usuarioRepository: Repository<Usuario>, comisionesRepository: Repository<Comision>, transcripcionRepository: Repository<Transcripcion>, logsRepository: Repository<Log>, telegramService: TelegramService);
    create(createSesionDto: CreateSesionDto): Promise<{
        ok: boolean;
        message: string;
        sesionSelected?: undefined;
    } | {
        ok: boolean;
        sesionSelected: Sesion;
        message: string;
    }>;
    findSesionesByComision(comisionId: number, usuarioLogueado: Usuario, pagina: number, limite: number, estado: string): Promise<{
        ok: boolean;
        message: string;
    } | {
        comision: Comision;
        ok: boolean;
        sesiones: Sesion[];
        total: number;
        message?: undefined;
    }>;
    findAllSesiones(pagina: number, limite: number, comisionId: number, estado: any): Promise<{
        ok: boolean;
        sesiones: Sesion[];
        total: number;
    }>;
    findAll(usuarioLogueado: Usuario, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        sesiones?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        sesiones: Sesion[];
        total: number;
        message?: undefined;
    }>;
    updateStatusSesion(usuarioLogueado: Usuario, sesionId: number, data: any): Promise<{
        ok: boolean;
        message: string;
    }>;
    setUsuarioToSesion(usuarioLogueado: Usuario, idSesion: number, usuariosIds: any): Promise<{
        ok: boolean;
        message: string;
    }>;
    obtenerMinutosSesion(duracion: number, cantUsuarios?: number): Promise<any[]>;
    asignarTranscripciones(sesionSelected: Sesion): Promise<{
        ok: boolean;
        message: string;
    }>;
    asignarTranscripcionesAddUsuario(sesionSelected: Sesion): Promise<{
        ok: boolean;
        message: string;
    }>;
    asignarTranscripcionesDeleteUsuario(sesionSelected: Sesion, usuarioEliminadoId: number): Promise<{
        ok: boolean;
        message: string;
    }>;
    deleteSesion(usuarioLogueado: Usuario, sesionId: number): Promise<{
        ok: boolean;
        message: string;
        totalDeleted?: undefined;
    } | {
        ok: boolean;
        message: string;
        totalDeleted: number;
    }>;
    pruebas(data: any): Promise<{
        ok: boolean;
        message: string;
        data: any[];
    }>;
    listarSesionesRevisadas(prefijo: string): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
    } | {
        ok: boolean;
        data: Sesion[];
        message?: undefined;
    }>;
    getTranscripcionesBySesion(sesionId: any): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        data: Transcripcion[];
        total: number;
        message?: undefined;
    }>;
    sincronizarSesion(body: any): Promise<{
        ok: boolean;
        message: string;
    }>;
    createLog(usuario: Usuario, action: string, descripcion: string): Promise<{
        ok: boolean;
        message: string;
    }>;
}
