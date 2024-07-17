import { Sesion } from "src/modules/sesiones/entities/sesion.entity";
import { Transcripcion } from "src/modules/transcripciones/entities/transcription.entity";
export declare enum rolEnum {
    SUPERVISOR = "supervisor",
    AUDITOR = "auditor",
    ADMIN = "admin"
}
export declare class Usuario {
    id: number;
    nombre: string;
    email: string;
    rol: 'supervisor' | 'auditor' | 'admin';
    password: string;
    sesiones: Sesion[];
    transcripciones: Transcripcion[];
    login_status: boolean;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
