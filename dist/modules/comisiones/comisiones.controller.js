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
exports.ComisionesController = void 0;
const common_1 = require("@nestjs/common");
const comisiones_service_1 = require("./comisiones.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const error_message_1 = require("../../utils/error.message");
const decorators_1 = require("../auth/decorators");
const roles_model_1 = require("../auth/models/roles.model");
const roles_guard_1 = require("../auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
const create_comision_dto_1 = require("./dto/create-comision.dto");
const update_comision_dto_1 = require("./dto/update-comision.dto");
let ComisionesController = class ComisionesController {
    constructor(comisionesService) {
        this.comisionesService = comisionesService;
    }
    async create(req, createComisionDto, res) {
        try {
            const response = await this.comisionesService.create(createComisionDto, req.user);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async update(req, id, updateComisionDto, res) {
        try {
            const response = await this.comisionesService.update(parseInt(id), updateComisionDto, req.user);
            if (!response.ok) {
                return res.status(400).json({
                    description: response.message,
                    ok: false,
                });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async comisionPorUsuario(req, query, res) {
        try {
            const response = await this.comisionesService.findComisionesByUsuario(req.user, query.page, query.limit);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
};
exports.ComisionesController = ComisionesController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comision_dto_1.CreateComisionDto, Object]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "create", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_comision_dto_1.UpdateComisionDto, Object]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('por-usuario'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "comisionPorUsuario", null);
exports.ComisionesController = ComisionesController = __decorate([
    (0, common_1.Controller)('comisiones'),
    __metadata("design:paramtypes", [comisiones_service_1.ComisionesService])
], ComisionesController);
//# sourceMappingURL=comisiones.controller.js.map