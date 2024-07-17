"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiExcepcionPersonalizada = void 0;
const common_1 = require("@nestjs/common");
class MiExcepcionPersonalizada extends common_1.HttpException {
    constructor(mensaje, statusCode) {
        super({ mensaje, statusCode }, statusCode);
    }
}
exports.MiExcepcionPersonalizada = MiExcepcionPersonalizada;
//# sourceMappingURL=exception.js.map