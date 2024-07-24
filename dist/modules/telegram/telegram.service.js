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
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
const config_1 = require("../../config");
let TelegramService = TelegramService_1 = class TelegramService {
    constructor(configService) {
        this.token = '';
        this.chatId = '';
        this.token = configService.telegram.token;
        this.chatId = configService.telegram.chatId;
    }
    onModuleInit() {
        if (TelegramService_1.bot) {
            return;
        }
        TelegramService_1.bot = new TelegramBot(this.token, { polling: true });
        TelegramService_1.bot.on('message', (msg) => {
        });
    }
    async sendMessage(message) {
        try {
            const response = await TelegramService_1.bot.sendMessage(this.chatId, message, { parse_mode: 'HTML' });
            console.log('Mensaje enviado con éxito:', response.text);
        }
        catch (error) {
            console.error('Error enviando el mensaje');
        }
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map