import { Comision } from './entities/comision.entity';
import { Repository } from 'typeorm';
import { CreateComisionDto } from './dto/create-comision.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UpdateComisionDto } from './dto/update-comision.dto';
import { Sesion } from '../sesiones/entities/sesion.entity';
export declare class ComisionesService {
    private comisionesRepository;
    private usuarioRepository;
    private sesionRepository;
    constructor(comisionesRepository: Repository<Comision>, usuarioRepository: Repository<Usuario>, sesionRepository: Repository<Sesion>);
    create(createComisionDto: CreateComisionDto, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    update(id: number, updateComisionDto: UpdateComisionDto, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    findComisionesByUsuario(usuarioLogueado: Usuario, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        comisiones?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        comisiones: Comision[];
        total: number;
        message?: undefined;
    }>;
    comisionesAdmin(pagina: number, limite: number): Promise<{
        ok: boolean;
        comisiones: Comision[];
        total: number;
    }>;
    findOne(id: number): Promise<void>;
}
