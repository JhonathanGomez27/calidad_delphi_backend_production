import { Usuario } from '../usuarios/entities/usuario.entity';
import { Log } from './entities/logs.entity';
import { Repository } from 'typeorm';
export declare class LogsService {
    private usuarioRepository;
    private logsRepository;
    constructor(usuarioRepository: Repository<Usuario>, logsRepository: Repository<Log>);
    getLogs(usuarioLogueado: Usuario, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        data: Log[];
        total: number;
        message?: undefined;
    }>;
}
