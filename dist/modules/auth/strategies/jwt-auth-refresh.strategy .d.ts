import { ConfigType } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import config from "src/config";
import { PayloadToken } from "../models/token.model";
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    constructor(configService: ConfigType<typeof config>);
    validate(payload: PayloadToken): Promise<PayloadToken>;
}
export {};
