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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sesion = exports.estadoEnum = void 0;
const comision_entity_1 = require("../../comisiones/entities/comision.entity");
const transcription_entity_1 = require("../../transcripciones/entities/transcription.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const typeorm_1 = require("typeorm");
var estadoEnum;
(function (estadoEnum) {
    estadoEnum["SINCRONIZADO"] = "Sincronizado";
    estadoEnum["REVISADO"] = "Revisado";
    estadoEnum["SINCALIDAD"] = "Sin calidad";
})(estadoEnum || (exports.estadoEnum = estadoEnum = {}));
let Sesion = class Sesion {
};
exports.Sesion = Sesion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sesion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sesion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Sesion.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sesion.prototype, "duracion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: estadoEnum,
    }),
    __metadata("design:type", String)
], Sesion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comision_entity_1.Comision, comision => comision.id),
    (0, typeorm_1.JoinColumn)({ name: 'comision_id' }),
    __metadata("design:type", comision_entity_1.Comision)
], Sesion.prototype, "comision", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sesion.prototype, "comision_id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => usuario_entity_1.Usuario, usuario => usuario.sesiones),
    __metadata("design:type", Array)
], Sesion.prototype, "usuarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transcription_entity_1.Transcripcion, transcripcion => transcripcion.sesion),
    __metadata("design:type", Array)
], Sesion.prototype, "transcripciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Sesion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Sesion.prototype, "updatedAt", void 0);
exports.Sesion = Sesion = __decorate([
    (0, typeorm_1.Entity)({ name: 'sesiones' })
], Sesion);
//# sourceMappingURL=sesion.entity.js.map