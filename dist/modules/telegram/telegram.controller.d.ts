import { TelegramService } from './telegram.service';
export declare class TelegramController {
    private readonly telegramService;
    constructor(telegramService: TelegramService);
    sendMessage(message: string): Promise<{
        success: boolean;
    }>;
}
