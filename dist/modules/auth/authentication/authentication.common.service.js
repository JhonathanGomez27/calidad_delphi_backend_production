"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationCommonService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../../config");
const error_message_1 = require("../../../utils/error.message");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const typeorm_2 = require("typeorm");
const hashing_service_1 = require("../../../providers/hashing.service");
let AuthenticationCommonService = class AuthenticationCommonService {
    constructor(usuarioRepository, configSerivce, hashingService, jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.configSerivce = configSerivce;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    generateJwtAccessToken(payload) {
        try {
            const accessToken = this.jwtService.signAsync(payload, {
                secret: this.configSerivce.session.jwtAccessTokenSecret,
                expiresIn: this.configSerivce.session.jwtAccessTokenExpiresTime,
            });
            return accessToken;
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    generateJwtRefreshoken(payload) {
        try {
            const refreshToken = this.jwtService.signAsync(payload, {
                secret: this.configSerivce.session.jwtRefreshTokenSecret,
                expiresIn: this.configSerivce.session.jwtRefreshTokenExpiresTime,
            });
            return refreshToken;
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    async existUser(email) {
        if (!email) {
            throw new common_1.ConflictException("Por favor ingrese un email válido");
        }
        const existUser = await this.usuarioRepository.findOneBy({ email });
        if (!existUser) {
            return false;
        }
        return true;
    }
    async findUserToAuthenticate(payload) {
        try {
            const user = await this.usuarioRepository.findOneBy({ email: payload.email });
            if (!user) {
                throw new common_1.ConflictException("Por favor ingrese un email y/o contraseña válida");
            }
            const isPasswordMatched = await this.hashingService.compare(payload.password.trim(), user.password);
            if (!isPasswordMatched) {
                throw new common_1.ConflictException("Por favor ingrese un email y/o contraseña válida");
            }
            return user;
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            console.log(message);
        }
    }
    async findUserAutenticated(id) {
        try {
            return await this.usuarioRepository.findOneBy({ id: id });
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await this.usuarioRepository.findOneBy({ email: email.trim() });
            if (!user) {
                throw new common_1.ConflictException("El usuario no existe");
            }
            return user;
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    async updateUserLoginStatus(id, status) {
        try {
            await this.usuarioRepository.update(id, { login_status: status });
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
};
exports.AuthenticationCommonService = AuthenticationCommonService;
exports.AuthenticationCommonService = AuthenticationCommonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, common_1.Inject)(config_1.default.KEY)),
    __metadata("design:paramtypes", [typeorm_2.Repository, void 0, hashing_service_1.HashingService,
        jwt_1.JwtService])
], AuthenticationCommonService);
//# sourceMappingURL=authentication.common.service.js.map