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
exports.TranscripcionesService = void 0;
const common_1 = require("@nestjs/common");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const logs_entity_1 = require("../logs/entities/logs.entity");
const transcription_entity_1 = require("./entities/transcription.entity");
const sesion_entity_1 = require("../sesiones/entities/sesion.entity");
let TranscripcionesService = class TranscripcionesService {
    constructor(usuarioRepository, logRepository, transcripcionRepository, sesionRepository) {
        this.usuarioRepository = usuarioRepository;
        this.logRepository = logRepository;
        this.transcripcionRepository = transcripcionRepository;
        this.sesionRepository = sesionRepository;
    }
    async getTranscriptionsBySesion(usuarioLogueado, idSesion, pagina, limite) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const sesion = await this.sesionRepository.createQueryBuilder('sesion')
            .leftJoinAndSelect('sesion.usuarios', 'usuario')
            .where('sesion.id = :idSesion', { idSesion })
            .select(['sesion.id', 'sesion.nombre', 'sesion.fecha', 'sesion.duracion', 'sesion.estado', 'sesion.comision_id'])
            .addSelect(['usuario.id', 'usuario.email', 'usuario.nombre', 'usuario.rol', 'usuario.is_active'])
            .getOne();
        if (!sesion) {
            return { ok: false, message: 'Sesion no encontrada' };
        }
        if (usuario.rol !== 'auditor') {
            try {
                const [transcripciones, total] = await this.transcripcionRepository
                    .createQueryBuilder('transcripcion')
                    .leftJoinAndSelect('transcripcion.usuarioAsignado', 'usuario')
                    .select([
                    'transcripcion.id',
                    'transcripcion.textoTranscripcion',
                    'transcripcion.textoCorregido',
                    'transcripcion.minuto',
                    'transcripcion.revisado',
                    'usuario.nombre'
                ])
                    .where('transcripcion.id_sesion = :idSesion', { idSesion: sesion.id })
                    .orderBy('transcripcion.minuto', 'ASC')
                    .skip((pagina - 1) * limite)
                    .take(limite)
                    .getManyAndCount();
                return {
                    ok: true,
                    sesion,
                    transcripciones,
                    total
                };
            }
            catch (error) {
                return { ok: false, message: 'Error al obtener las transcripciones de la sesion' };
            }
        }
        sesion.usuarios = undefined;
        const [transcripciones, total] = await this.transcripcionRepository.findAndCount({
            where: { id_sesion: sesion.id, usuario_asignado: usuario.id },
            select: ['id', 'textoTranscripcion', 'textoCorregido', 'minuto', 'revisado', 'usuario_asignado'],
            order: { minuto: 'ASC' },
            skip: (pagina - 1) * limite,
            take: limite
        });
        return {
            ok: true,
            sesion,
            transcripciones,
            total
        };
    }
    async getAllTranscripctionsBySesion(usuarioLogueado, idSesion, pagina, limite) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const sesion = await this.sesionRepository.createQueryBuilder('sesion')
            .leftJoinAndSelect('sesion.usuarios', 'usuario')
            .where('sesion.id = :idSesion', { idSesion })
            .select(['sesion.id', 'sesion.nombre', 'sesion.fecha', 'sesion.duracion', 'sesion.estado', 'sesion.comision_id'])
            .addSelect(['usuario.id', 'usuario.email', 'usuario.nombre', 'usuario.rol', 'usuario.is_active'])
            .getOne();
        if (!sesion) {
            return { ok: false, message: 'Sesion no encontrada' };
        }
        try {
            const [transcripciones, total] = await this.transcripcionRepository.findAndCount({
                where: { id_sesion: sesion.id },
                select: ['id', 'textoTranscripcion', 'textoCorregido', 'minuto', 'revisado', 'usuarioAsignado'],
                order: { minuto: 'ASC' },
                skip: (pagina - 1) * limite,
                take: limite
            });
            return {
                ok: true,
                sesion,
                transcripciones,
                total
            };
        }
        catch (error) {
            return { ok: false, message: 'Error al obtener las transcripciones de la sesion' };
        }
    }
    async updateTranscripcionRevisada(usuarioLogueado, id, data) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const transcripcion = await this.transcripcionRepository.findOne({
            where: { id },
        });
        if (!transcripcion) {
            return { ok: false, message: 'Transcripcion no encontrada' };
        }
        transcripcion.textoCorregido = data.textoCorregido;
        transcripcion.editadoPor = usuario;
        transcripcion.updated_at = new Date();
        transcripcion.revisado = true;
        try {
            await this.transcripcionRepository.save(transcripcion);
            return { ok: true, message: 'Transcripcion guardada correctamente' };
        }
        catch (error) {
            return { ok: false, message: 'Error al guardar la transcripcion' };
        }
    }
};
exports.TranscripcionesService = TranscripcionesService;
exports.TranscripcionesService = TranscripcionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(logs_entity_1.Log)),
    __param(2, (0, typeorm_1.InjectRepository)(transcription_entity_1.Transcripcion)),
    __param(3, (0, typeorm_1.InjectRepository)(sesion_entity_1.Sesion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TranscripcionesService);
//# sourceMappingURL=transcripciones.service.js.map