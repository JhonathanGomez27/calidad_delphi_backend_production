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
exports.Transcripcion = void 0;
const sesion_entity_1 = require("../../sesiones/entities/sesion.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const typeorm_1 = require("typeorm");
let Transcripcion = class Transcripcion {
};
exports.Transcripcion = Transcripcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Transcripcion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sesion_entity_1.Sesion, sesion => sesion.id),
    (0, typeorm_1.JoinColumn)({ name: 'id_sesion' }),
    __metadata("design:type", sesion_entity_1.Sesion)
], Transcripcion.prototype, "sesion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transcripcion.prototype, "id_sesion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transcripcion.prototype, "textoTranscripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transcripcion.prototype, "textoCorregido", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Transcripcion.prototype, "minuto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, usuario => usuario.transcripcionesAsignadas),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_asignado' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Transcripcion.prototype, "usuarioAsignado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Transcripcion.prototype, "usuario_asignado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, usuario => usuario.transcripcionesEditadas),
    (0, typeorm_1.JoinColumn)({ name: 'editado_por' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Transcripcion.prototype, "editadoPor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Transcripcion.prototype, "editado_por", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Transcripcion.prototype, "revisado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Transcripcion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, onUpdate: 'now()' }),
    __metadata("design:type", Date)
], Transcripcion.prototype, "updated_at", void 0);
exports.Transcripcion = Transcripcion = __decorate([
    (0, typeorm_1.Entity)({ name: 'transcripciones' }),
    (0, typeorm_1.Unique)(['id_sesion', 'minuto'])
], Transcripcion);
//# sourceMappingURL=transcription.entity.js.map