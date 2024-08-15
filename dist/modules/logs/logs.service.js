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
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const logs_entity_1 = require("./entities/logs.entity");
const typeorm_2 = require("typeorm");
let LogsService = class LogsService {
    constructor(usuarioRepository, logsRepository) {
        this.usuarioRepository = usuarioRepository;
        this.logsRepository = logsRepository;
    }
    async getLogs(usuarioLogueado, pagina, limite) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioLogueado.id }
        });
        if (!usuario) {
            return { ok: false, message: 'Usuario no encontrado' };
        }
        const [logs, total] = await this.logsRepository.createQueryBuilder('logs')
            .leftJoinAndSelect('logs.id_usuario', 'usuario')
            .select([
            'logs.id',
            'logs.action',
            'logs.descripcion',
            'logs.created_at',
            'usuario.nombre',
            'usuario.email'
        ])
            .orderBy('logs.created_at', 'DESC')
            .skip((pagina - 1) * limite)
            .take(limite)
            .getManyAndCount();
        return {
            ok: true,
            data: logs,
            total: total,
        };
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(logs_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LogsService);
//# sourceMappingURL=logs.service.js.map