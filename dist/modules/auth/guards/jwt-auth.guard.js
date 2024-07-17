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
exports.JwtAuthAccessGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const authentication_1 = require("../authentication");
let JwtAuthAccessGuard = class JwtAuthAccessGuard extends (0, passport_1.AuthGuard)("jwt-access") {
    constructor(reflector, authenticationCommonService) {
        super();
        this.reflector = reflector;
        this.authenticationCommonService = authenticationCommonService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        return super.canActivate(context);
    }
};
exports.JwtAuthAccessGuard = JwtAuthAccessGuard;
exports.JwtAuthAccessGuard = JwtAuthAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        authentication_1.AuthenticationCommonService])
], JwtAuthAccessGuard);
//# sourceMappingURL=jwt-auth.guard.js.map