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
exports.PuntuacionService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const config_1 = require("../../config");
let PuntuacionService = class PuntuacionService {
    constructor(configService) {
        this.token = '';
        this.token = configService.openAi.token;
        this.openai = new openai_1.OpenAI({
            apiKey: this.token
        });
    }
    async correctPunctuation(text) {
        const prompt = `Corrige solo la puntuación de este texto sin cambiar ninguna palabra ni su orden. Asegúrate de: 1) Usar signos de interrogación y exclamación cuando el tono lo requiera. 2) Colocar comas, puntos y otros signos de puntuación donde correspondan. 3) Usar mayúsculas únicamente al inicio de oraciones, después de puntos, y en nombres propios. No añadas, elimines ni modifiques el estilo del contenido; solo ajusta la puntuación y las mayúsculas.\n\n${text}`;
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt },
                ]
            });
            return ({ ok: true, message: response.choices[0].message.content });
        }
        catch (error) {
            console.log('Error al usar la API de OpenAI:', error);
            return { ok: false, message: 'Error al usar la API de OpenAI' };
        }
    }
};
exports.PuntuacionService = PuntuacionService;
exports.PuntuacionService = PuntuacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], PuntuacionService);
//# sourceMappingURL=puntuacion.service.js.map