"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./modules/usuarios/entities/usuario.entity");
const logs_entity_1 = require("./modules/logs/entities/logs.entity");
const usuarios_module_1 = require("./modules/usuarios/usuarios.module");
const logs_module_1 = require("./modules/logs/logs.module");
const comisiones_module_1 = require("./modules/comisiones/comisiones.module");
const sesiones_module_1 = require("./modules/sesiones/sesiones.module");
const transcripciones_module_1 = require("./modules/transcripciones/transcripciones.module");
const telegram_module_1 = require("./modules/telegram/telegram.module");
const puntuacion_module_1 = require("./modules/puntuacion/puntuacion.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default]
            }),
            database_module_1.DatabaseModule,
            usuarios_module_1.UsuariosModule,
            logs_module_1.LogsModule,
            comisiones_module_1.ComisionesModule,
            sesiones_module_1.SesionesModule,
            transcripciones_module_1.TranscripcionesModule,
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, logs_entity_1.Log]),
            telegram_module_1.TelegramModule,
            puntuacion_module_1.PuntuacionModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map