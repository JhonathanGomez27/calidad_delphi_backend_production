import { AuthenticationCommonService } from "./authentication.common.service";
import { SigninPayload } from "../models/signin.model";
import { Repository } from "typeorm";
import { Log } from "src/modules/logs/entities/logs.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
export declare class AuthenticationService {
    private readonly authcommonService;
    private logsRepository;
    constructor(authcommonService: AuthenticationCommonService, logsRepository: Repository<Log>);
    signIn(payload: SigninPayload): Promise<{
        ok: boolean;
        message: string;
        accessToken?: undefined;
        refreshToken?: undefined;
        user?: undefined;
    } | {
        ok: boolean;
        message: string;
        accessToken: string | {
            message: string;
        };
        refreshToken: string | {
            message: string;
        };
        user: Usuario;
    } | {
        message: string;
        ok?: undefined;
        accessToken?: undefined;
        refreshToken?: undefined;
        user?: undefined;
    }>;
    generateNewAccessToken(payload: SigninPayload, refreshToken: string): Promise<{
        message: string;
        accesstoken: string | {
            message: string;
        };
        refreshToken: string;
        user: Usuario;
    } | {
        message: string;
        accesstoken?: undefined;
        refreshToken?: undefined;
        user?: undefined;
    }>;
    createLog(usuario: Usuario, action: string, descripcion: string): Promise<{
        ok: boolean;
        message: string;
    }>;
}
