import { ConfigType } from "@nestjs/config";
import config from "src/config";
import { PayloadToken } from "../models/token.model";
import { Strategy } from "passport-jwt";
declare const JwtAccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessTokenStrategy extends JwtAccessTokenStrategy_base {
    private readonly configSerivce;
    constructor(configSerivce: ConfigType<typeof config>);
    validate(payload: PayloadToken): Promise<PayloadToken>;
}
export {};
