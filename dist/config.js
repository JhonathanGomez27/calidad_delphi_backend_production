"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => {
    return {
        database: {
            dbname: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DATABASE_PORT,
            hostname: process.env.DATABASE_HOST,
            connection: process.env.DATABASE_CONNECTION,
            schema: process.env.DATABASE_SCHEMA,
        },
        session: {
            accessToken: process.env.ACCESS_TOKEN,
            jwtAccessTokenSecret: process.env.JWT_ACCESS_SECRET,
            jwtAccessTokenExpiresTime: process.env.JWT_ACCESS_EXPIRES_TIME,
            jwtRefreshTokenSecret: process.env.JWT_REFRESH_SECRET,
            jwtRefreshTokenExpiresTime: process.env.JWT_REFRESH_EXPIRES_TIME,
            jwtForgotPasswordSecret: process.env.JWT_FORGOT_PASSWORD_SECRET,
            jwtForgotPasswordExpiresTime: process.env.JWT_FORGOT_PASSWORD_EXPIRES_TIME,
        },
        telegram: {
            token: process.env.TELEGRAM_BOT_TOKEN,
            chatId: process.env.TELEGRAM_CHAT_ID,
        },
        openAi: {
            token: process.env.OPEN_AI_API_KEY,
            active: process.env.OPEN_AI_ACTIVE,
        }
    };
});
//# sourceMappingURL=config.js.map