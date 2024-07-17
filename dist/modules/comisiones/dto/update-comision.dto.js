"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComisionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_comision_dto_1 = require("./create-comision.dto");
class UpdateComisionDto extends (0, mapped_types_1.PartialType)(create_comision_dto_1.CreateComisionDto) {
}
exports.UpdateComisionDto = UpdateComisionDto;
//# sourceMappingURL=update-comision.dto.js.map