import { CreateComisionDto } from "./create-comision.dto";
declare const UpdateComisionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateComisionDto>>;
export declare class UpdateComisionDto extends UpdateComisionDto_base {
    nombre?: string;
    descripcion?: string;
    prefijo?: string;
    puntuacion?: boolean;
}
export {};
