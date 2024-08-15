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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const logs_entity_1 = require("../logs/entities/logs.entity");
const hashing_service_1 = require("../../providers/hashing.service");
const logs_messages_1 = require("../../utils/logs.messages");
let UsuariosService = class UsuariosService {
    constructor(usuarioRepository, hashingService, logsRepository) {
        this.usuarioRepository = usuarioRepository;
        this.hashingService = hashingService;
        this.logsRepository = logsRepository;
    }
    async onModuleInit() {
        const userCount = await this.usuarioRepository.count();
        if (userCount === 0) {
            await this.createDefaultUser();
        }
    }
    async createDefaultUser() {
        const defaultUser = new usuario_entity_1.Usuario();
        defaultUser.email = 'admin@calidad.com';
        defaultUser.nombre = 'admin';
        defaultUser.password = await this.hashingService.hash('Abcd1234.');
        defaultUser.rol = 'admin';
        await this.usuarioRepository.save(defaultUser);
    }
    async create(createUsuarioDto, usuarioLogueado) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return {
                ok: false,
                message: 'Usuario no encontrado'
            };
        }
        const existUser = await this.usuarioRepository.findOne({
            where: { email: createUsuarioDto.email }
        });
        if (existUser) {
            return {
                ok: false,
                message: 'El email ya se encuentra registrado'
            };
        }
        const newUser = new usuario_entity_1.Usuario();
        newUser.email = createUsuarioDto.email;
        newUser.nombre = createUsuarioDto.nombre;
        newUser.password = await this.hashingService.hash(createUsuarioDto.password);
        newUser.rol = createUsuarioDto.rol;
        await this.usuarioRepository.save(newUser);
        await this.createLog(usuarioLogueado, logs_messages_1.logsEnum.REGISTRAR_USUARIO, `Usuario ${newUser.nombre} creado por ${usuario.nombre}`);
        return {
            ok: true,
            message: 'Usuario creado con exito'
        };
    }
    async update(id, updateUsuarioDto, usuarioLogueado) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const existUser = await this.usuarioRepository.findOne({ where: { id } });
        if (!existUser) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        if (updateUsuarioDto.email) {
            const userEmail = await this.usuarioRepository.findOne({
                where: { email: updateUsuarioDto.email },
            });
            if (userEmail && userEmail.id != id) {
                return {
                    ok: false,
                    message: 'El email ya esta registrado',
                };
            }
            existUser.email = updateUsuarioDto.email;
        }
        if (updateUsuarioDto.nombre) {
            existUser.nombre = updateUsuarioDto.nombre;
        }
        if (updateUsuarioDto.password) {
            existUser.password = await this.hashingService.hash(updateUsuarioDto.password);
        }
        if (updateUsuarioDto.rol) {
            existUser.rol = updateUsuarioDto.rol;
        }
        await this.usuarioRepository.save(existUser);
        await this.createLog(usuarioLogueado, logs_messages_1.logsEnum.EDITAR_USUARIO, `Usuario ${existUser.nombre} actualizado por ${usuario.nombre}`);
        return {
            ok: true,
            message: 'Usuario actualizado con exito',
        };
    }
    async getAll(usuarioLogueado, pagina, limite) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        if (usuario.rol === 'supervisor') {
            const [users, total] = await this.usuarioRepository.findAndCount({
                select: ['id', 'email', 'nombre', 'rol', 'login_status', 'is_active'],
                where: {
                    rol: (0, typeorm_2.Not)((0, typeorm_2.In)(["admin", "supervisor"])),
                },
                order: { id: 'ASC' },
                skip: (pagina - 1) * limite,
                take: limite
            });
            return {
                ok: true,
                data: users,
                total
            };
        }
        const [users, total] = await this.usuarioRepository.findAndCount({
            select: ['id', 'email', 'nombre', 'rol', 'login_status', 'is_active'],
            where: {
                rol: (0, typeorm_2.Not)("admin")
            },
            order: { id: 'ASC' },
            skip: (pagina - 1) * limite,
            take: limite
        });
        return {
            ok: true,
            data: users,
            total
        };
    }
    async getActiveUsers(usuarioLogueado, sesionId) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const usuarios = await this.usuarioRepository.createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.sesiones', 'sesion')
            .where('usuario.is_active = :isActive', { isActive: true })
            .andWhere(qb => {
            const subQuery = qb.subQuery()
                .select('us.id')
                .from(usuario_entity_1.Usuario, 'us')
                .leftJoin('us.sesiones', 's')
                .where('s.id = :sesionId')
                .getQuery();
            return 'usuario.id NOT IN ' + subQuery;
        })
            .setParameter('sesionId', sesionId)
            .select(['usuario.id', 'usuario.email', 'usuario.nombre', 'usuario.rol', 'usuario.is_active'])
            .andWhere('usuario.rol = :rol', { rol: 'auditor' })
            .getMany();
        return {
            ok: true,
            usuarios
        };
    }
    async getOne(id, usuarioLogueado) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const user = await this.usuarioRepository.findOne({ where: { id }, select: ['id', 'email', 'nombre', 'rol', 'login_status', 'is_active'] });
        if (!user) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        return {
            ok: true,
            data: user
        };
    }
    async setActive(id, usuarioLogueado) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const user = await this.usuarioRepository.findOne({ where: { id } });
        if (!user) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        user.is_active = !user.is_active;
        user.login_status = false;
        await this.usuarioRepository.save(user);
        if (user.is_active) {
            await this.createLog(usuarioLogueado, logs_messages_1.logsEnum.ACTIVAR_USUARIO, `Usuario ${user.nombre} activado por ${usuario.nombre}`);
        }
        else {
            await this.createLog(usuarioLogueado, logs_messages_1.logsEnum.ACTIVAR_USUARIO, `Usuario ${user.nombre} desactivado por ${usuario.nombre}`);
        }
        return {
            ok: true,
            message: 'Usuario actualizado con exito'
        };
    }
    async logout(user) {
        const userLogout = await this.usuarioRepository.findOne({
            where: { id: user.id },
        });
        if (!userLogout) {
            return { ok: false, message: 'usuario no encontrado', };
        }
        userLogout.login_status = false;
        await this.usuarioRepository.save(userLogout);
        await this.createLog(user, logs_messages_1.logsEnum.CERRAR_SESION, `Sesión cerrada por ${userLogout.nombre}`);
        return {
            ok: true,
            message: 'Sesión cerrada con exito',
        };
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
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(2, (0, typeorm_1.InjectRepository)(logs_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_service_1.HashingService,
        typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map