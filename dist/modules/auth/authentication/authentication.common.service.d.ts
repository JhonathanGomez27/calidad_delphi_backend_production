import { JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin.dto';
import { HashingService } from 'src/providers/hashing.service';
export declare class AuthenticationCommonService {
    private usuarioRepository;
    private readonly configSerivce;
    private readonly hashingService;
    private readonly jwtService;
    constructor(usuarioRepository: Repository<Usuario>, configSerivce: ConfigType<typeof config>, hashingService: HashingService, jwtService: JwtService);
    generateJwtAccessToken(payload: PayloadToken): Promise<string> | {
        message: string;
    };
    generateJwtRefreshoken(payload: PayloadToken): Promise<string> | {
        message: string;
    };
    existUser(email: string): Promise<boolean>;
    findUserToAuthenticate(payload: SignInDto): Promise<Usuario>;
    findUserAutenticated(id: number): Promise<Usuario>;
    findUserByEmail(email: string): Promise<Usuario | {
        message: string;
    }>;
    updateUserLoginStatus(id: number, status: boolean): Promise<{
        message: string;
    }>;
}
