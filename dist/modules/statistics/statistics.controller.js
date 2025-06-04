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
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./statistics.service");
const decorators_1 = require("../auth/decorators");
const roles_model_1 = require("../auth/models/roles.model");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const error_message_1 = require("../../utils/error.message");
const swagger_1 = require("@nestjs/swagger");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
const ExcelJs = require("exceljs");
let StatisticsController = class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getStatistics(req, query, res) {
        try {
            const response = await this.statisticsService.getStatisticsFilter(req.user, query);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            return res.json(response);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async getStatisticsByUser(query, res) {
        try {
            const response = await this.statisticsService.getTranscriptionsEditedByUser(query);
            if (!response.ok) {
                return res.status(400).json({ message: response.message, ok: false });
            }
            const { sesiones } = response;
            const workbook = new ExcelJs.Workbook();
            const worksheet = workbook.addWorksheet('Transcripciones');
            worksheet.columns = [
                { header: 'Sesión ID', key: 'sesionId', width: 15 },
                { header: 'Nombre de Sesión', key: 'sesionNombre', width: 30 },
                { header: 'Fecha de Sesión', key: 'sesionFecha', width: 20 },
                { header: 'Duración de Sesión', key: 'sesionDuracion', width: 20 },
                { header: 'Transcripción ID', key: 'transcripcionId', width: 15 },
                { header: 'Texto Original', key: 'textoTranscripcion', width: 50 },
                { header: 'Texto Corregido', key: 'textoCorregido', width: 50 },
                { header: 'Minuto', key: 'minuto', width: 10 },
                { header: 'Fecha de Edición', key: 'updatedAt', width: 20 },
            ];
            sesiones.forEach((sesion) => {
                if (!sesion.transcripciones || sesion.transcripciones.length === 0) {
                    console.warn(`La sesión ${sesion.sesionId} no tiene transcripciones.`);
                    return;
                }
                sesion.transcripciones.forEach((transcripcion) => {
                    if (!transcripcion.transcripcionId) {
                        console.warn('Transcripción sin ID encontrada:', transcripcion);
                        return;
                    }
                    worksheet.addRow({
                        sesionId: sesion.sesionId,
                        sesionNombre: sesion.sesionNombre,
                        sesionFecha: sesion.sesionFecha,
                        sesionDuracion: sesion.sesionDuracion,
                        transcripcionId: transcripcion.transcripcionId,
                        textoTranscripcion: transcripcion.textoTranscripcion,
                        textoCorregido: transcripcion.textoCorregido,
                        minuto: transcripcion.minuto,
                        updatedAt: transcripcion.updatedAt,
                    });
                });
            });
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=transcripciones.xlsx');
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR, roles_model_1.Role.AUDITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limite', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fechaInicio', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fechaFin', required: false }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getStatistics", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.SUPERVISOR, roles_model_1.Role.AUDITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('user'),
    (0, swagger_1.ApiQuery)({ name: 'fechaInicio', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fechaFin', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'user_id', required: false }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtersPaginatedQuery_1.FiltersPaginatedQuery, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getStatisticsByUser", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, common_1.Controller)('statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map