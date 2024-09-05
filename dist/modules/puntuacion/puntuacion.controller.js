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
exports.PuntuacionController = void 0;
const common_1 = require("@nestjs/common");
const puntuacion_service_1 = require("./puntuacion.service");
let PuntuacionController = class PuntuacionController {
    constructor(puntuacionService) {
        this.puntuacionService = puntuacionService;
    }
    async correctPunctuation(text, res) {
        const response = await this.puntuacionService.correctPunctuation(text);
        if (response.ok) {
            return res.status(200).json(response);
        }
        return res.status(400).json(response);
    }
};
exports.PuntuacionController = PuntuacionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('text')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PuntuacionController.prototype, "correctPunctuation", null);
exports.PuntuacionController = PuntuacionController = __decorate([
    (0, common_1.Controller)('puntuacion'),
    __metadata("design:paramtypes", [puntuacion_service_1.PuntuacionService])
], PuntuacionController);
//# sourceMappingURL=puntuacion.controller.js.map