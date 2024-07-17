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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const authentication_1 = require("../authentication");
const roles_decorator_1 = require("../decorators/roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(reflector, authenticationCommonService) {
        this.reflector = reflector;
        this.authenticationCommonService = authenticationCommonService;
    }
    async canActivate(context) {
        const roles = this.reflector.get(roles_decorator_1.ROLES_KEY, context.getHandler());
        if (!roles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const record = await this.authenticationCommonService.findUserAutenticated(user.id);
        const isNotForbiddenRole = roles.some((role) => role === record.rol);
        if (!isNotForbiddenRole) {
            throw new common_1.ForbiddenException("Acceso prohibido");
        }
        return isNotForbiddenRole;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, authentication_1.AuthenticationCommonService])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map