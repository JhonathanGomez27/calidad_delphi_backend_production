import { Sesion } from "src/modules/sesiones/entities/sesion.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
export declare class Transcripcion {
    id: number;
    sesion: Sesion;
    id_sesion: number;
    textoTranscripcion: string;
    textoCorregido: string;
    minuto: number;
    usuario: Usuario;
    editado_por: number;
    revisado: boolean;
    created_at: Date;
    updated_at: Date;
}
