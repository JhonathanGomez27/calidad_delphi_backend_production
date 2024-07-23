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
exports.Usuario = exports.rolEnum = void 0;
const sesion_entity_1 = require("../../sesiones/entities/sesion.entity");
const transcription_entity_1 = require("../../transcripciones/entities/transcription.entity");
const typeorm_1 = require("typeorm");
var rolEnum;
(function (rolEnum) {
    rolEnum["SUPERVISOR"] = "supervisor";
    rolEnum["AUDITOR"] = "auditor";
    rolEnum["ADMIN"] = "admin";
})(rolEnum || (exports.rolEnum = rolEnum = {}));
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: rolEnum,
    }),
    __metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => sesion_entity_1.Sesion, sesion => sesion.usuarios),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Usuario.prototype, "sesiones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transcription_entity_1.Transcripcion, transcripcion => transcripcion.usuarioAsignado),
    __metadata("design:type", Array)
], Usuario.prototype, "transcripcionesAsignadas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transcription_entity_1.Transcripcion, transcripcion => transcripcion.editadoPor),
    __metadata("design:type", Array)
], Usuario.prototype, "transcripcionesEditadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "login_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', nullable: true, onUpdate: 'now()' }),
    __metadata("design:type", Date)
], Usuario.prototype, "updatedAt", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuarios' })
], Usuario);
//# sourceMappingURL=usuario.entity.js.map