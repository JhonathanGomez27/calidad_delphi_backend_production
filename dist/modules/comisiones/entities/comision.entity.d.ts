import { Sesion } from "src/modules/sesiones/entities/sesion.entity";
export declare class Comision {
    id: number;
    nombre: string;
    descripcion: string;
    prefijo: string;
    sesiones: Sesion[];
    created_at: Date;
    updated_at: Date;
}
