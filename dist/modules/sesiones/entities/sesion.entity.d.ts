import { Comision } from "src/modules/comisiones/entities/comision.entity";
import { Transcripcion } from "src/modules/transcripciones/entities/transcription.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
export declare enum estadoEnum {
    SINCRONIZADO = "Sincronizado",
    REVISADO = "Revisado",
    SINCALIDAD = "Sin calidad"
}
export declare class Sesion {
    id: number;
    nombre: string;
    fecha: Date;
    duracion: string;
    estado: 'Sincronizado' | 'Revisado' | 'Sin calidad';
    comision: Comision;
    comision_id: number;
    usuarios: Usuario[];
    transcripciones: Transcripcion[];
    createdAt: Date;
    updatedAt: Date;
}
