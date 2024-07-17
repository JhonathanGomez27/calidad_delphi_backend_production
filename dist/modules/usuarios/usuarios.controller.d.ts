import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(req: any, createUsuarioDto: CreateUsuarioDto, res: any): Promise<any>;
    update(req: any, id: string, updateUsuarioDto: UpdateUsuarioDto, res: any): Promise<any>;
    findAll(req: any, query: FiltersPaginatedQuery, res: any): Promise<any>;
    findActiveUsers(req: any, sesionId: number, res: any): Promise<any>;
    setActive(req: any, id: string, res: any): Promise<any>;
    logout(req: any, res: any): Promise<any>;
}
