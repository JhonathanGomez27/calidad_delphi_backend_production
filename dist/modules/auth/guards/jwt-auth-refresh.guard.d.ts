import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
declare const JwtAuthRefreshGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthRefreshGuard extends JwtAuthRefreshGuard_base {
    private readonly reflector;
    constructor(reflector: Reflector);
    canACtivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
