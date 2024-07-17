import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
export declare class Log {
    id: string;
    action: string;
    descripcion: string;
    id_usuario: Usuario;
    created_at: Date;
    updated_at: Date;
}
