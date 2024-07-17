"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSesionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sesion_dto_1 = require("./create-sesion.dto");
class UpdateSesionDto extends (0, mapped_types_1.PartialType)(create_sesion_dto_1.CreateSesionDto) {
}
exports.UpdateSesionDto = UpdateSesionDto;
//# sourceMappingURL=update-sesion.dto.js.map