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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const error_message_1 = require("../../utils/error.message");
const decorators_1 = require("../auth/decorators");
const roles_model_1 = require("../auth/models/roles.model");
const roles_guard_1 = require("../auth/guards/roles.guard");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const swagger_1 = require("@nestjs/swagger");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async create(req, createUsuarioDto, res) {
        try {
            const response = await this.usuariosService.create(createUsuarioDto, req.user);
            if (!response.ok) {
                return res.status(400).json({
                    description: response.message,
                    ok: false
                });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async update(req, id, updateUsuarioDto, res) {
        try {
            const response = await this.usuariosService.update(parseInt(id), updateUsuarioDto, req.user);
            if (!response.ok) {
                return res.status(400).json({
                    description: response.message,
                    ok: false
                });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async findAll(req, query, res) {
        const response = await this.usuariosService.getAll(req.user, query.page, query.limit);
        if (!response.ok) {
            return res.status(400).json(response);
        }
        return res.json(response);
    }
    async findActiveUsers(req, sesionId, res) {
        const response = await this.usuariosService.getActiveUsers(req.user, sesionId);
        if (!response.ok) {
            return res.status(400).json(response);
        }
        return res.json(response);
    }
    async setActive(req, id, res) {
        try {
            const response = await this.usuariosService.setActive(parseInt(id), req.user);
            if (!response.ok) {
                return res.status(400).json({
                    description: response.message,
                    ok: false
                });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async logout(req, res) {
        try {
            const user = req.user;
            const response = await this.usuariosService.logout(user);
            if (!response.ok) {
                return res.status(400).json({
                    description: response.message,
                    ok: false
                });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_usuario_dto_1.CreateUsuarioDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_usuario_dto_1.UpdateUsuarioDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Get)('active/:sesionId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('sesionId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findActiveUsers", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)('setActive/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "setActive", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)("logout"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "logout", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map