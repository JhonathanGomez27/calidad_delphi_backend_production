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
exports.SesionesService = void 0;
const common_1 = require("@nestjs/common");
const sesion_entity_1 = require("./entities/sesion.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const comision_entity_1 = require("../comisiones/entities/comision.entity");
const logs_entity_1 = require("../logs/entities/logs.entity");
const transcription_entity_1 = require("../transcripciones/entities/transcription.entity");
const telegram_service_1 = require("../telegram/telegram.service");
const logs_messages_1 = require("../../utils/logs.messages");
const puntuacion_service_1 = require("../puntuacion/puntuacion.service");
const format_text_1 = require("../../utils/format-text");
let SesionesService = class SesionesService {
    constructor(sesionRepository, usuarioRepository, comisionesRepository, transcripcionRepository, logsRepository, telegramService, puntuacionService) {
        this.sesionRepository = sesionRepository;
        this.usuarioRepository = usuarioRepository;
        this.comisionesRepository = comisionesRepository;
        this.transcripcionRepository = transcripcionRepository;
        this.logsRepository = logsRepository;
        this.telegramService = telegramService;
        this.puntuacionService = puntuacionService;
    }
    async create(createSesionDto) {
        const prefijo = createSesionDto.prefix;
        const comision = await this.comisionesRepository.findOne({
            where: { prefijo },
        });
        if (!comision) {
            return { ok: false, message: 'Comision no encontrada' };
        }
        const newSesion = new sesion_entity_1.Sesion();
        newSesion.nombre = createSesionDto.nombre;
        newSesion.fecha = createSesionDto.fecha;
        newSesion.duracion = createSesionDto.duracion;
        newSesion.estado = 'Sin calidad';
        newSesion.comision = comision;
        const existSesion = await this.sesionRepository.findOne({
            where: { nombre: createSesionDto.nombre },
        });
        let sesionSelected = new sesion_entity_1.Sesion();
        if (existSesion) {
            newSesion.id = existSesion.id;
            await this.sesionRepository.save(newSesion);
            sesionSelected = newSesion;
        }
        else {
            const message = `<strong>ATENCIÓN CALIDAD:</strong> Acaba de llegar una transcripción de la comisión: <strong>${comision.nombre}</strong> con nombre de sesión: <strong>${newSesion.nombre}</strong>`;
            await this.telegramService.sendMessage(message);
            sesionSelected = await this.sesionRepository.save(newSesion);
        }
        const entidadesTranscripcion = await Promise.all(createSesionDto.transcripcion.map(async (transcripcion) => {
            let textoCorregido = (0, format_text_1.cleanText)(transcripcion.texto);
            if (comision.puntuacion) {
                const responsePuntuacion = await this.puntuacionService.correctPunctuation(transcripcion.texto);
                if (responsePuntuacion.ok) {
                    textoCorregido = responsePuntuacion.message;
                }
                else {
                    textoCorregido = transcripcion.texto;
                }
            }
            const nuevaTranscripcion = new transcription_entity_1.Transcripcion();
            nuevaTranscripcion.id_sesion = sesionSelected.id;
            nuevaTranscripcion.textoTranscripcion = textoCorregido;
            nuevaTranscripcion.textoCorregido = textoCorregido;
            nuevaTranscripcion.minuto = transcripcion.minuto;
            nuevaTranscripcion.usuario_asignado = null;
            return nuevaTranscripcion;
        }));
        try {
            await this.transcripcionRepository.save(entidadesTranscripcion);
        }
        catch (error) {
            console.log('Error al guardar las transcripciones: ', error);
            return { ok: false, message: `Error al guardar las transcripciones: ${error.detail}` };
        }
        await this.asignarTranscripciones(sesionSelected);
        return {
            ok: true,
            sesionSelected,
            message: 'Sesion created',
        };
    }
    async findSesionesByComision(comisionId, usuarioLogueado, pagina, limite, estado) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const comision = await this.comisionesRepository.findOne({
            where: { id: comisionId },
            select: ['id', 'nombre', 'descripcion', 'prefijo'],
        });
        if (!comision) {
            return { ok: false, message: 'Comision no encontrada' };
        }
        if (usuario.rol !== 'auditor') {
            try {
                const respuesta = await this.findAllSesiones(pagina, limite, comisionId, estado);
                return { ...respuesta, comision };
            }
            catch (error) {
                return { ok: false, message: 'Error al obtener las sesiones' };
            }
        }
        const [sesiones, total] = await this.sesionRepository.createQueryBuilder('sesion')
            .leftJoinAndSelect('sesion.usuarios', 'usuario')
            .where('sesion.comision_id = :comisionId', { comisionId })
            .andWhere('sesion.estado = :estado', { estado: estado })
            .andWhere('usuario.id = :usuarioId', { usuarioId: usuario.id })
            .skip((pagina - 1) * limite)
            .take(limite)
            .getManyAndCount();
        return {
            ok: true,
            comision,
            sesiones,
            total,
        };
    }
    async findAllSesiones(pagina, limite, comisionId, estado) {
        const [sesiones, total] = await this.sesionRepository.findAndCount({
            where: { comision: { id: comisionId }, estado: estado },
            skip: (pagina - 1) * limite,
            take: limite,
        });
        return {
            ok: true,
            sesiones,
            total,
        };
    }
    async findAll(usuarioLogueado, pagina, limite) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const [sesiones, total] = await this.sesionRepository.findAndCount({
            skip: (pagina - 1) * limite,
            take: limite,
        });
        return {
            ok: true,
            sesiones,
            total,
        };
    }
    async updateStatusSesion(usuarioLogueado, sesionId, data) {
        const newStatus = data.estado;
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const sesion = await this.sesionRepository.findOne({
            where: { id: sesionId },
        });
        if (!sesion) {
            return { ok: false, message: 'Sesion no encontrada' };
        }
        sesion.estado = newStatus;
        await this.sesionRepository.save(sesion);
        await this.createLog(usuario, logs_messages_1.logsEnum.CAMBIAR_ESTADO_SESION, `Estado de la sesion ${sesion.nombre} actualizado a ${newStatus} por ${usuario.nombre}`);
        return { ok: true, message: 'Estado de la sesion actualizado' };
    }
    async setUsuarioToSesion(usuarioLogueado, idSesion, usuariosIds) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const sesion = await this.sesionRepository.findOne({
            where: { id: idSesion }, relations: ['usuarios'],
        });
        if (!sesion) {
            return { ok: false, message: 'Sesion no encontrada' };
        }
        const usuarios = await this.usuarioRepository.find({
            where: { id: (0, typeorm_1.In)(usuariosIds.usuarios) },
            select: ['id', 'email', 'nombre', 'rol', 'is_active'],
        });
        if (!usuarios) {
            return { ok: false, message: 'Usuarios no encontrados' };
        }
        const usuarioEliminado = usuariosIds.usuarioEliminado || null;
        sesion.usuarios = usuarios;
        await this.sesionRepository.save(sesion);
        if (usuarioEliminado !== null && usuarios.length > 0) {
            await this.asignarTranscripcionesDeleteUsuario(sesion, usuarioEliminado);
            await this.createLog(usuario, logs_messages_1.logsEnum.ASIGNAR_TRANSCRIPCION, `Usuario eliminado de la sesion ${sesion.nombre} por ${usuario.nombre}`);
        }
        else {
            await this.asignarTranscripcionesAddUsuario(sesion);
            await this.createLog(usuario, logs_messages_1.logsEnum.ASIGNAR_TRANSCRIPCION, `Usuarios agregados a la sesion ${sesion.nombre} por ${usuario.nombre}`);
        }
        return { ok: true, message: 'Usuarios agregados a la sesion' };
    }
    async obtenerMinutosSesion(duracion, cantUsuarios = 1) {
        let distribucion = new Array(cantUsuarios).fill(0);
        for (let i = 0; i < duracion; i++) {
            distribucion[i % cantUsuarios]++;
        }
        return distribucion;
    }
    async asignarTranscripciones(sesionSelected) {
        const sesion = await this.sesionRepository.findOne({
            where: { id: sesionSelected.id },
            relations: ['usuarios'],
        });
        const usuarios = sesion.usuarios;
        if (usuarios.length === 0) {
            await this.transcripcionRepository.update({ id_sesion: sesion.id }, { usuario_asignado: null });
            return { ok: true, message: 'No hay usuarios en la sesion' };
        }
        let transcripciones;
        transcripciones = await this.transcripcionRepository.find({
            where: { id_sesion: sesion.id, usuario_asignado: (0, typeorm_1.IsNull)() },
        });
        const totalUsuarios = usuarios.length;
        const updatePromises = transcripciones.map((transcripcion, i) => {
            const usuarioId = usuarios[i % totalUsuarios].id;
            return this.transcripcionRepository.update(transcripcion.id, {
                usuario_asignado: usuarioId,
            });
        });
        await Promise.all(updatePromises);
        return { ok: true, message: 'Asignacion exitosa' };
    }
    async asignarTranscripcionesAddUsuario(sesionSelected) {
        const sesion = await this.sesionRepository.findOne({
            where: { id: sesionSelected.id },
            relations: ['usuarios'],
        });
        const usuarios = sesion.usuarios;
        if (usuarios.length === 0) {
            await this.transcripcionRepository.update({ id_sesion: sesion.id }, { usuario_asignado: null });
            return { ok: true, message: 'No hay usuarios en la sesion' };
        }
        const transcripcionesActuales = await this.transcripcionRepository.count({
            where: { id_sesion: sesion.id, revisado: false },
        });
        const minutosSesion = await this.obtenerMinutosSesion(transcripcionesActuales, usuarios.length);
        let acumuladorSkip = 0;
        for (let i = 0; i < usuarios.length; i++) {
            const minutos = minutosSesion[i];
            const skip = i > 0 ? minutosSesion[i - 1] : 0;
            acumuladorSkip = acumuladorSkip + skip;
            const [transcripciones, total] = await this.transcripcionRepository.findAndCount({
                where: { id_sesion: sesion.id, revisado: false },
                order: { minuto: 'ASC' },
                skip: acumuladorSkip,
                take: minutos,
            });
            const transcripcionesIds = transcripciones.map(transcripcion => transcripcion.id);
            await this.transcripcionRepository.update(transcripcionesIds, { usuarioAsignado: usuarios[i] });
        }
        return { ok: true, message: 'Asignacion exitosa' };
    }
    async asignarTranscripcionesDeleteUsuario(sesionSelected, usuarioEliminadoId) {
        try {
            const sesion = await this.sesionRepository.findOne({
                where: { id: sesionSelected.id },
                relations: ['usuarios'],
            });
            const usuarios = sesion.usuarios;
            const [transcripciones, total] = await this.transcripcionRepository.findAndCount({
                where: { id_sesion: sesion.id, usuario_asignado: usuarioEliminadoId },
            });
            const totalUsuarios = usuarios.length;
            const updatePromises = transcripciones.map((transcripcion, i) => {
                const usuarioId = usuarios[i % totalUsuarios].id;
                return this.transcripcionRepository.update(transcripcion.id, {
                    usuario_asignado: usuarioId,
                });
            });
            await Promise.all(updatePromises);
            return { ok: true, message: 'Asignacion exitosa' };
        }
        catch (error) {
            return { ok: false, message: 'Error al asignar transcripciones' };
        }
    }
    async deleteSesion(usuarioLogueado, sesionId) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const sesion = await this.sesionRepository.findOne({
            where: { id: sesionId },
        });
        if (!sesion) {
            return { ok: false, message: 'Sesion no encontrada' };
        }
        const response = await this.transcripcionRepository.delete({ id_sesion: sesionId });
        const totalDeleted = response.affected;
        await this.sesionRepository.remove(sesion);
        return { ok: true, message: 'Sesion eliminada', totalDeleted };
    }
    async pruebas(sesionId) {
        const sesion = await this.sesionRepository.findOne({
            where: { id: sesionId },
        });
        if (!sesion) {
            return { ok: false, message: 'Sesion no encontrada' };
        }
        const [transcripciones, total] = await this.transcripcionRepository.findAndCount({
            select: ['textoTranscripcion', 'minuto'],
            where: { id_sesion: sesionId },
            order: { minuto: 'ASC' },
        });
        return { ok: true, data: transcripciones, total };
    }
    async listarSesionesRevisadas(prefijo) {
        const comision = await this.comisionesRepository.findOne({
            where: { prefijo },
        });
        if (!comision) {
            return { ok: false, message: 'Comision no encontrada' };
        }
        const sesiones = await this.sesionRepository.find({
            where: { estado: sesion_entity_1.estadoEnum.REVISADO, comision_id: comision.id },
        });
        return { ok: true, data: sesiones };
    }
    async getTranscripcionesBySesion(sesionId) {
        const sesion = await this.sesionRepository.findOne({
            where: { id: sesionId },
        });
        if (!sesion) {
            return { ok: false, message: 'Sesion no encontrada' };
        }
        const [transcripciones, total] = await this.transcripcionRepository.findAndCount({
            select: ['id', 'textoTranscripcion', 'textoCorregido', 'minuto', 'revisado'],
            where: { id_sesion: sesionId },
            order: { minuto: 'ASC' },
        });
        return { ok: true, data: transcripciones, total };
    }
    async sincronizarSesion(body) {
        const sesionId = body.idSesion;
        const sesion = await this.sesionRepository.findOne({
            where: { id: sesionId },
        });
        if (!sesion) {
            return { ok: false, message: 'Sesion no encontrada' };
        }
        sesion.estado = sesion_entity_1.estadoEnum.SINCRONIZADO;
        const comision = await this.comisionesRepository.findOne({
            where: { id: sesion.comision_id },
        });
        await this.sesionRepository.save(sesion);
        const message = `<strong>ATENCIÓN OPERATIVO:</strong> la transcripción de la comisión: <strong>${comision.nombre}</strong> con nombre de sesión: <strong>${sesion.nombre}</strong> está en proceso de generación de archivos, en los próximos <strong>10 minutos</strong> puede dirigirse a relatoría y realizar el envío respectivo.`;
        await this.telegramService.sendMessage(message);
        await this.createLog(null, logs_messages_1.logsEnum.CAMBIAR_ESTADO_SESION, `Estado de la sesion ${sesion.nombre} actualizado a ${sesion_entity_1.estadoEnum.SINCRONIZADO}`);
        return { ok: true, message: 'Sesion sincronizada' };
    }
    async createLog(usuario, action, descripcion) {
        try {
            let newLog = new logs_entity_1.Log();
            newLog.action = action;
            newLog.descripcion = descripcion;
            newLog.id_usuario = usuario;
            await this.logsRepository.save(newLog);
            return { ok: true, message: 'Log creado con exito.' };
        }
        catch (error) {
            return { ok: false, message: 'Error al crear el log.' };
        }
    }
};
exports.SesionesService = SesionesService;
exports.SesionesService = SesionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sesion_entity_1.Sesion)),
    __param(1, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __param(2, (0, typeorm_2.InjectRepository)(comision_entity_1.Comision)),
    __param(3, (0, typeorm_2.InjectRepository)(transcription_entity_1.Transcripcion)),
    __param(4, (0, typeorm_2.InjectRepository)(logs_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        telegram_service_1.TelegramService,
        puntuacion_service_1.PuntuacionService])
], SesionesService);
//# sourceMappingURL=sesiones.service.js.map