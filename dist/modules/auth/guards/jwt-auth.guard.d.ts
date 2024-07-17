import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthenticationCommonService } from "../authentication";
declare const JwtAuthAccessGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthAccessGuard extends JwtAuthAccessGuard_base {
    private readonly reflector;
    private readonly authenticationCommonService;
    constructor(reflector: Reflector, authenticationCommonService: AuthenticationCommonService);
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};
