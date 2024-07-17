import { Role } from "../models/roles.model";
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: (Role | string)[]) => import("@nestjs/common").CustomDecorator<string>;
