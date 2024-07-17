"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("../../config");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const logs_entity_1 = require("../logs/entities/logs.entity");
const bcrypt_service_1 = require("../../providers/bcrypt.service");
const hashing_service_1 = require("../../providers/hashing.service");
const authentication_1 = require("./authentication");
const authentication_service_1 = require("./authentication/authentication.service");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_auth_access_strategy_1 = require("./strategies/jwt-auth-access.strategy");
const jwt_auth_refresh_strategy_1 = require("./strategies/jwt-auth-refresh.strategy ");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, logs_entity_1.Log]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_2.default.KEY],
                useFactory: async (configService) => {
                    return {
                        secret: configService.session.jwtAccessTokenSecret,
                        signOptions: {
                            expiresIn: configService.session.jwtAccessTokenExpiresTime,
                        },
                    };
                },
            })
        ],
        providers: [
            { provide: hashing_service_1.HashingService, useClass: bcrypt_service_1.BcryptService },
            authentication_1.AuthenticationCommonService,
            authentication_service_1.AuthenticationService,
            local_strategy_1.LocalStrategy,
            jwt_auth_access_strategy_1.JwtAccessTokenStrategy,
            jwt_auth_refresh_strategy_1.JwtRefreshTokenStrategy
        ],
        controllers: [
            authentication_1.AuthenticationController
        ],
        exports: [authentication_1.AuthenticationCommonService, authentication_service_1.AuthenticationService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map