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
exports.TranscripcionesController = void 0;
const common_1 = require("@nestjs/common");
const transcripciones_service_1 = require("./transcripciones.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
const error_message_1 = require("../../utils/error.message");
let TranscripcionesController = class TranscripcionesController {
    constructor(transcripcionesService) {
        this.transcripcionesService = transcripcionesService;
    }
    async getTranscripcionesBySesion(sesionId, req, query, res) {
        try {
            const response = await this.transcripcionesService.getTranscriptionsBySesion(req.user, sesionId, query.page, query.limit);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async getAllTranscripcionesBySesion(sesionId, req, query, res) {
        try {
            const response = await this.transcripcionesService.getAllTranscripctionsBySesion(req.user, sesionId, query.page, query.limit);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async getTranscripcionesPendientesBySesion(sesionId, req, query, res) {
        try {
            const response = await this.transcripcionesService.getTranscripcionesPendientes(req.user, sesionId, query.page, query.limit);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async getTranscripcionesRevisadasBySesion(sesionId, req, query, res) {
        try {
            const response = await this.transcripcionesService.getTranscripcionesRevisadas(req.user, sesionId, query.page, query.limit);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async updateTranscripcionRevisada(transcripcionId, req) {
        try {
            const response = await this.transcripcionesService.updateTranscripcionRevisada(req.user, transcripcionId, req.body);
            if (!response.ok) {
                return { ok: false, message: response.message };
            }
            return { ok: true, message: response.message };
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
};
exports.TranscripcionesController = TranscripcionesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('sesion/:sesionId'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    __param(0, (0, common_1.Param)('sesionId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], TranscripcionesController.prototype, "getTranscripcionesBySesion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('sesion/all/:sesionId'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    __param(0, (0, common_1.Param)('sesionId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], TranscripcionesController.prototype, "getAllTranscripcionesBySesion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('sesion/pendientes/:sesionId'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    __param(0, (0, common_1.Param)('sesionId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], TranscripcionesController.prototype, "getTranscripcionesPendientesBySesion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('sesion/revisadas/:sesionId'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    __param(0, (0, common_1.Param)('sesionId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], TranscripcionesController.prototype, "getTranscripcionesRevisadasBySesion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':transcripcionId'),
    __param(0, (0, common_1.Param)('transcripcionId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TranscripcionesController.prototype, "updateTranscripcionRevisada", null);
exports.TranscripcionesController = TranscripcionesController = __decorate([
    (0, common_1.Controller)('transcripciones'),
    __metadata("design:paramtypes", [transcripciones_service_1.TranscripcionesService])
], TranscripcionesController);
//# sourceMappingURL=transcripciones.controller.js.map