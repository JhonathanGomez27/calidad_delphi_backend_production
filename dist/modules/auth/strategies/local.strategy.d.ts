import { Strategy } from "passport-local";
import { AuthenticationCommonService } from "../authentication/authentication.common.service";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authenticationCommonService;
    constructor(authenticationCommonService: AuthenticationCommonService);
    validate(email: string, password: string): Promise<Usuario>;
}
export {};
