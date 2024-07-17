import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthenticationCommonService } from "../authentication";
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly authenticationCommonService;
    constructor(reflector: Reflector, authenticationCommonService: AuthenticationCommonService);
    canActivate(context: ExecutionContext): Promise<any>;
}
