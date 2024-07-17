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
exports.SesionesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const error_message_1 = require("../../utils/error.message");
const decorators_1 = require("../auth/decorators");
const roles_model_1 = require("../auth/models/roles.model");
const roles_guard_1 = require("../auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
const sesiones_service_1 = require("./sesiones.service");
const create_sesion_dto_1 = require("./dto/create-sesion.dto");
let SesionesController = class SesionesController {
    constructor(sesionesService) {
        this.sesionesService = sesionesService;
    }
    async create(req, createSesionDto, res) {
        try {
            const response = await this.sesionesService.create(createSesionDto, req.user);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async finSesionesByComision(comisionId, req, query, res) {
        try {
            const response = await this.sesionesService.findSesionesByComision(comisionId, req.user, query.page, query.limit, query.estado);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async findAll(req, query, res) {
        try {
            const response = await this.sesionesService.findAll(req.user, query.page, query.limit);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async updateSesionStatus(sesionId, req, res) {
        try {
            const response = await this.sesionesService.updateStatusSesion(req.user, sesionId, req.body);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async setUsersToSesion(req, res, body, sesionId) {
        try {
            const response = await this.sesionesService.setUsuarioToSesion(req.user, sesionId, body);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async prueba(req, res) {
        try {
            const response = await this.sesionesService.pruebas(req.body);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false, data: response.data });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async listarSesionesRevisadas(req, prefijo, res) {
        try {
            const response = await this.sesionesService.listarSesionesRevisadas(prefijo);
            return res.json({ data: response.data || [], ok: true, status: 200 });
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async getTranscripcionesSesion(req, query, res) {
        try {
            const response = await this.sesionesService.getTranscripcionesBySesion(query.idSesion);
            return res.json({ data: response.data || [], ok: true, status: 200, total: response.total || 0 });
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async sincronizarSesion(req, body, res) {
        try {
            const response = await this.sesionesService.sincronizarSesion(body);
            return res.json({ data: response.message, ok: true, status: 200 });
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
};
exports.SesionesController = SesionesController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sesion_dto_1.CreateSesionDto, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('comision/:comisionId'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    __param(0, (0, common_1.Param)('comisionId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "finSesionesByComision", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)('status/:sesionId'),
    __param(0, (0, common_1.Param)('sesionId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "updateSesionStatus", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('setUsers/:sesionId'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Param)('sesionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "setUsersToSesion", null);
__decorate([
    (0, common_1.Post)('prueba'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "prueba", null);
__decorate([
    (0, common_1.Get)('listaSesionesRevisadas/:prefijo'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('prefijo')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "listarSesionesRevisadas", null);
__decorate([
    (0, common_1.Get)('transcripcionesSesion'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "getTranscripcionesSesion", null);
__decorate([
    (0, common_1.Get)('sincronizarSesion'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "sincronizarSesion", null);
exports.SesionesController = SesionesController = __decorate([
    (0, common_1.Controller)('sesiones'),
    __metadata("design:paramtypes", [sesiones_service_1.SesionesService])
], SesionesController);
//# sourceMappingURL=sesiones.controller.js.map