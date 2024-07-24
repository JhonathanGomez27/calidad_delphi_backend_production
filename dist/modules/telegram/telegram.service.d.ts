import { OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
export declare class TelegramService implements OnModuleInit {
    private static bot;
    private readonly token;
    private readonly chatId;
    constructor(configService: ConfigType<typeof config>);
    onModuleInit(): void;
    sendMessage(message: string): Promise<void>;
}
