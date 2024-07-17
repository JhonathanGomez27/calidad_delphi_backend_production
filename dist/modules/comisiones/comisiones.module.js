"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionesModule = void 0;
const common_1 = require("@nestjs/common");
const comisiones_controller_1 = require("./comisiones.controller");
const comisiones_service_1 = require("./comisiones.service");
const comision_entity_1 = require("./entities/comision.entity");
const logs_entity_1 = require("../logs/entities/logs.entity");
const auth_module_1 = require("../auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const sesion_entity_1 = require("../sesiones/entities/sesion.entity");
let ComisionesModule = class ComisionesModule {
};
exports.ComisionesModule = ComisionesModule;
exports.ComisionesModule = ComisionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([comision_entity_1.Comision, logs_entity_1.Log, usuario_entity_1.Usuario, sesion_entity_1.Sesion]),
            auth_module_1.AuthModule
        ],
        controllers: [comisiones_controller_1.ComisionesController],
        providers: [comisiones_service_1.ComisionesService]
    })
], ComisionesModule);
//# sourceMappingURL=comisiones.module.js.map