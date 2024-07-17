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
exports.ComisionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comision_entity_1 = require("./entities/comision.entity");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const sesion_entity_1 = require("../sesiones/entities/sesion.entity");
let ComisionesService = class ComisionesService {
    constructor(comisionesRepository, usuarioRepository, sesionRepository) {
        this.comisionesRepository = comisionesRepository;
        this.usuarioRepository = usuarioRepository;
        this.sesionRepository = sesionRepository;
    }
    async create(createComisionDto, usuarioLogueado) {
        const usuario = this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const existComision = await this.comisionesRepository.findOne({
            where: { prefijo: createComisionDto.prefijo }
        });
        if (existComision) {
            return { ok: false, message: 'Ya existe una comision con este prefijo' };
        }
        const newComision = new comision_entity_1.Comision();
        newComision.nombre = createComisionDto.nombre;
        newComision.descripcion = createComisionDto.descripcion;
        newComision.prefijo = createComisionDto.prefijo;
        await this.comisionesRepository.save(newComision);
        return {
            ok: true,
            message: 'Comision created'
        };
    }
    async update(id, updateComisionDto, usuarioLogueado) {
        const usuario = this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const comision = await this.comisionesRepository.findOne({ where: { id } });
        if (!comision) {
            return { ok: false, message: 'Comision no encontrada.' };
        }
        comision.nombre = updateComisionDto.nombre;
        comision.descripcion = updateComisionDto.descripcion;
        comision.prefijo = updateComisionDto.prefijo;
        await this.comisionesRepository.save(comision);
        return {
            ok: true,
            message: 'Comision actualizada con exito.'
        };
    }
    async findComisionesByUsuario(usuarioLogueado, pagina, limite) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        if (usuario.rol !== 'auditor') {
            try {
                const response = await this.comisionesAdmin(pagina, limite);
                return {
                    ok: true,
                    comisiones: response.comisiones,
                    total: response.total
                };
            }
            catch (error) {
                console.log(error);
                return { ok: false, message: 'Error al obtener las comisiones.' };
            }
        }
        const [comisiones, total] = await this.comisionesRepository.createQueryBuilder('comision')
            .select(['comision.id', 'comision.nombre', 'comision.descripcion', 'comision.prefijo'])
            .innerJoin('comision.sesiones', 'sesion')
            .innerJoin('sesion.usuarios', 'usuario')
            .where('usuario.id = :userId', { userId: usuarioLogueado.id })
            .getManyAndCount();
        for (const comision of comisiones) {
            const sesiones = await this.sesionRepository.find({
                where: {
                    comision_id: comision.id,
                    estado: 'Sin calidad',
                    usuarios: { id: usuarioLogueado.id }
                }
            });
            comision['numero_sesiones'] = sesiones.length;
        }
        return {
            ok: true,
            comisiones,
            total
        };
    }
    async comisionesAdmin(pagina, limite) {
        const [comisiones, total] = await this.comisionesRepository.createQueryBuilder('comision')
            .select(['comision.id', 'comision.nombre', 'comision.descripcion', 'comision.prefijo'])
            .groupBy('comision.id')
            .skip((pagina - 1) * limite)
            .take(limite)
            .getManyAndCount();
        for (const comision of comisiones) {
            const sesiones = await this.sesionRepository.find({
                where: {
                    comision_id: comision.id,
                    estado: 'Sin calidad'
                }
            });
            comision['numero_sesiones'] = sesiones.length;
        }
        return {
            ok: true,
            comisiones,
            total
        };
    }
    async findOne(id) {
    }
};
exports.ComisionesService = ComisionesService;
exports.ComisionesService = ComisionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comision_entity_1.Comision)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(2, (0, typeorm_1.InjectRepository)(sesion_entity_1.Sesion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ComisionesService);
//# sourceMappingURL=comisiones.service.js.map