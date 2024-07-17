import { AuthenticationCommonService } from './authentication.common.service';
import { Request } from 'express';
import { AuthenticationService } from './authentication.service';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
export declare class AuthenticationController {
    private readonly authenticationCommonService;
    private readonly authService;
    constructor(authenticationCommonService: AuthenticationCommonService, authService: AuthenticationService);
    signIn(req: Request, res: any): Promise<any>;
    existUser(correo: string): Promise<boolean>;
    refreshToken(req: Request): Promise<{
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
}
