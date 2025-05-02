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
const date_fns_tz_1 = require("date-fns-tz");
let StatisticsService = class StatisticsService {
    constructor(sesionRepository, usuarioRepository, comisionesRepository, transcripcionRepository) {
        this.sesionRepository = sesionRepository;
        this.usuarioRepository = usuarioRepository;
        this.comisionesRepository = comisionesRepository;
        this.transcripcionRepository = transcripcionRepository;
    }
    async getStatistics(user, query) {
        try {
            const { page, limit, fechaInicio, fechaFin } = query;
            const temp_date_1 = new Date(`${fechaInicio} 00:00:00`);
            const temp_date_2 = new Date(`${fechaFin} 23:59:59`);
            let startDate = (0, date_fns_tz_1.toZonedTime)(temp_date_1, 'America/Bogota');
            let endDate = (0, date_fns_tz_1.toZonedTime)(temp_date_2, 'America/Bogota');
            startDate = (0, date_fns_tz_1.format)(startDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/Bogota' });
            endDate = (0, date_fns_tz_1.format)(endDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/Bogota' });
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
        typeorm_2.Repository])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map