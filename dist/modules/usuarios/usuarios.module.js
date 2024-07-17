"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const usuarios_controller_1 = require("./usuarios.controller");
const usuarios_service_1 = require("./usuarios.service");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const auth_module_1 = require("../auth/auth.module");
const hashing_service_1 = require("../../providers/hashing.service");
const bcrypt_service_1 = require("../../providers/bcrypt.service");
const logs_entity_1 = require("../logs/entities/logs.entity");
const sesion_entity_1 = require("../sesiones/entities/sesion.entity");
const transcription_entity_1 = require("../transcripciones/entities/transcription.entity");
let UsuariosModule = class UsuariosModule {
};
exports.UsuariosModule = UsuariosModule;
exports.UsuariosModule = UsuariosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, logs_entity_1.Log, sesion_entity_1.Sesion, transcription_entity_1.Transcripcion]),
            auth_module_1.AuthModule
        ],
        controllers: [usuarios_controller_1.UsuariosController],
        providers: [
            {
                provide: hashing_service_1.HashingService,
                useClass: bcrypt_service_1.BcryptService
            },
            usuarios_service_1.UsuariosService
        ]
    })
], UsuariosModule);
//# sourceMappingURL=usuarios.module.js.map