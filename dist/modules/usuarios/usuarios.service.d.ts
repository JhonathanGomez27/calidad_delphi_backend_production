import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Log } from '../logs/entities/logs.entity';
import { HashingService } from 'src/providers/hashing.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private usuarioRepository;
    private readonly hashingService;
    private logsRepository;
    constructor(usuarioRepository: Repository<Usuario>, hashingService: HashingService, logsRepository: Repository<Log>);
    onModuleInit(): Promise<void>;
    private createDefaultUser;
    create(createUsuarioDto: CreateUsuarioDto, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    getAll(usuarioLogueado: Usuario, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        data: Usuario[];
        total: number;
        message?: undefined;
    }>;
    getActiveUsers(usuarioLogueado: Usuario, sesionId: number): Promise<{
        ok: boolean;
        message: string;
        usuarios?: undefined;
    } | {
        ok: boolean;
        usuarios: Usuario[];
        message?: undefined;
    }>;
    getOne(id: number, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
    } | {
        ok: boolean;
        data: Usuario;
        message?: undefined;
    }>;
    setActive(id: number, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    logout(user: any): Promise<{
        ok: boolean;
        message: string;
    }>;
    createLog(usuario: Usuario, action: string, descripcion: string): Promise<{
        ok: boolean;
        message: string;
    }>;
}
