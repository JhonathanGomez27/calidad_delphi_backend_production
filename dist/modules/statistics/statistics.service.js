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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sesion_entity_1 = require("../sesiones/entities/sesion.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const comision_entity_1 = require("../comisiones/entities/comision.entity");
const transcription_entity_1 = require("../transcripciones/entities/transcription.entity");
const date_utils_service_1 = require("../../utils/date-utils.service");
const roles_model_1 = require("../auth/models/roles.model");
let StatisticsService = class StatisticsService {
    constructor(sesionRepository, usuarioRepository, comisionesRepository, transcripcionRepository, dateUtilsService) {
        this.sesionRepository = sesionRepository;
        this.usuarioRepository = usuarioRepository;
        this.comisionesRepository = comisionesRepository;
        this.transcripcionRepository = transcripcionRepository;
        this.dateUtilsService = dateUtilsService;
    }
    async getStatistics(user, query) {
        try {
            const { page, limit, fechaInicio, fechaFin } = query;
            const fechaInicioBogota = `${fechaInicio} 00:00:00`;
            const fechaFinBogota = `${fechaFin} 23:59:59`;
            const startDate = this.dateUtilsService.fakeZonedTimeToUtc(fechaInicioBogota);
            const endDate = this.dateUtilsService.fakeZonedTimeToUtc(fechaFinBogota);
            const offset = (page - 1) * limit;
            const usuarios = await this.usuarioRepository.createQueryBuilder('usuario')
                .leftJoinAndSelect('usuario.transcripcionesEditadas', 'transcripcion')
                .where('transcripcion.updated_at BETWEEN :startDate AND :endDate', { startDate, endDate })
                .select([
                'usuario.id AS usuarioId',
                'usuario.nombre AS usuarioNombre',
                'COUNT(transcripcion.id) AS totalTranscripciones'
            ])
                .groupBy('usuario.id, usuario.nombre')
                .orderBy('totalTranscripciones', 'DESC')
                .limit(limit)
                .offset(offset)
                .getRawMany();
            const total = await this.usuarioRepository.createQueryBuilder('usuario')
                .leftJoinAndSelect('usuario.transcripcionesEditadas', 'transcripcion')
                .where('transcripcion.updated_at BETWEEN :startDate AND :endDate', { startDate, endDate })
                .select([
                'usuario.id AS usuarioId',
                'usuario.nombre AS usuarioNombre',
                'COUNT(transcripcion.id) AS totalTranscripciones',
            ])
                .orderBy('totalTranscripciones', 'DESC')
                .groupBy('usuario.id')
                .getCount();
            return { ok: true, message: 'Estadísticas obtenidas correctamente', usuarios, total };
        }
        catch (error) {
            console.log(error);
            return { ok: false, message: 'Error al obtener las estadísticas', error };
        }
    }
    async getStatisticsFilter(user, query) {
        try {
            const { page, limit, fechaInicio, fechaFin } = query;
            const fechaInicioBogota = `${fechaInicio} 00:00:00`;
            const fechaFinBogota = `${fechaFin} 23:59:59`;
            const startDate = this.dateUtilsService.fakeZonedTimeToUtc(fechaInicioBogota);
            const endDate = this.dateUtilsService.fakeZonedTimeToUtc(fechaFinBogota);
            const offset = (page - 1) * limit;
            const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario')
                .leftJoinAndSelect('usuario.transcripcionesEditadas', 'transcripcion')
                .where('transcripcion.updated_at BETWEEN :startDate AND :endDate', { startDate, endDate });
            if (user.rol !== roles_model_1.Role.ADMIN && user.rol !== roles_model_1.Role.SUPERVISOR) {
                queryBuilder.andWhere('usuario.id = :userId', { userId: user.id });
            }
            const usuarios = await queryBuilder
                .select([
                'usuario.id AS usuarioId',
                'usuario.nombre AS usuarioNombre',
                'COUNT(transcripcion.id) AS totalTranscripciones'
            ])
                .groupBy('usuario.id, usuario.nombre')
                .orderBy('totalTranscripciones', 'DESC')
                .limit(limit)
                .offset(offset)
                .getRawMany();
            const totalQueryBuilder = this.usuarioRepository.createQueryBuilder('usuario')
                .leftJoinAndSelect('usuario.transcripcionesEditadas', 'transcripcion')
                .where('transcripcion.updated_at BETWEEN :startDate AND :endDate', { startDate, endDate });
            if (user.rol !== roles_model_1.Role.ADMIN && user.rol !== roles_model_1.Role.SUPERVISOR) {
                totalQueryBuilder.andWhere('usuario.id = :userId', { userId: user.id });
            }
            const total = await totalQueryBuilder
                .select([
                'usuario.id AS usuarioId',
                'usuario.nombre AS usuarioNombre',
                'COUNT(transcripcion.id) AS totalTranscripciones',
            ])
                .orderBy('totalTranscripciones', 'DESC')
                .groupBy('usuario.id')
                .getCount();
            return { ok: true, message: 'Estadísticas obtenidas correctamente', usuarios, total };
        }
        catch (error) {
            console.log(error);
            return { ok: false, message: 'Error al obtener las estadísticas', error };
        }
    }
    async getTranscriptionsEditedByUser(query) {
        try {
            const { fechaInicio, fechaFin, user_id } = query;
            const user = await this.usuarioRepository.findOne({ where: { id: user_id } });
            if (!user) {
                return { ok: false, message: 'Usuario no encontrado' };
            }
            const fechaInicioBogota = `${fechaInicio} 00:00:00`;
            const fechaFinBogota = `${fechaFin} 23:59:59`;
            const startDate = this.dateUtilsService.fakeZonedTimeToUtc(fechaInicioBogota);
            const endDate = this.dateUtilsService.fakeZonedTimeToUtc(fechaFinBogota);
            const transcripciones = await this.transcripcionRepository.createQueryBuilder('transcripcion')
                .innerJoinAndSelect('transcripcion.sesion', 'sesion')
                .where('transcripcion.editado_por = :userId', { userId: user.id })
                .andWhere('transcripcion.updated_at BETWEEN :startDate AND :endDate', { startDate, endDate })
                .orderBy('sesion.id', 'ASC')
                .addOrderBy('transcripcion.updated_at', 'DESC')
                .select([
                'transcripcion.id AS transcripcionId',
                'transcripcion.textoTranscripcion AS textoTranscripcion',
                'transcripcion.textoCorregido AS textoCorregido',
                'transcripcion.minuto AS minuto',
                'transcripcion.updated_at AS updatedAt',
                'sesion.nombre AS sesionNombre',
                'sesion.fecha AS sesionFecha',
                'sesion.duracion AS sesionDuracion',
                'sesion.id AS sesionId',
            ])
                .getRawMany();
            const total = await this.transcripcionRepository.createQueryBuilder('transcripcion')
                .where('transcripcion.editado_por = :userId', { userId: user.id })
                .andWhere('transcripcion.updated_at BETWEEN :startDate AND :endDate', { startDate, endDate })
                .getCount();
            const agrupadasPorSesion = transcripciones.reduce((result, transcripcion) => {
                const sesionId = transcripcion.sesionid;
                if (!result[sesionId]) {
                    result[sesionId] = {
                        sesionId: transcripcion.sesionid,
                        sesionNombre: transcripcion.sesionnombre,
                        sesionFecha: transcripcion.sesionfecha,
                        sesionDuracion: transcripcion.sesionduracion,
                        transcripciones: [],
                    };
                }
                result[sesionId].transcripciones.push({
                    transcripcionId: transcripcion.transcripcionid,
                    textoTranscripcion: transcripcion.textotranscripcion,
                    textoCorregido: transcripcion.textocorregido,
                    minuto: transcripcion.minuto,
                    updatedAt: this.dateUtilsService.utcDateToLocal(new Date(transcripcion.updatedat)),
                });
                return result;
            }, {});
            const sesiones = Object.values(agrupadasPorSesion);
            return {
                ok: true,
                message: 'Transcripciones obtenidas correctamente',
                sesiones,
                total
            };
        }
        catch (error) {
            console.error(error);
            return { ok: false, message: 'Error al obtener las estadísticas', error };
        }
    }
    async getStisticsByUser(query) {
        try {
        }
        catch (error) {
            console.error(error);
            return { ok: false, message: 'Error al obtener las estadísticas', error };
        }
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sesion_entity_1.Sesion)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(2, (0, typeorm_1.InjectRepository)(comision_entity_1.Comision)),
    __param(3, (0, typeorm_1.InjectRepository)(transcription_entity_1.Transcripcion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        date_utils_service_1.DateUtilsService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map