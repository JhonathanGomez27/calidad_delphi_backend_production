"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDbError = handleDbError;
const exception_1 = require("./exception");
function handleDbError(error) {
    console.log('error', error);
    if (error.code === 'ER_DUP_ENTRY') {
        throw new exception_1.MiExcepcionPersonalizada('El registro que intentas insertar ya existe', 409);
    }
    if (error.status == '409') {
        throw new exception_1.MiExcepcionPersonalizada(error.response.message, 409);
    }
    if (error.status == '430') {
        throw new exception_1.MiExcepcionPersonalizada(error.response.mensaje, 400);
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new exception_1.MiExcepcionPersonalizada('El registro que intentas eliminar no existe', 404);
    }
    else {
        throw new exception_1.MiExcepcionPersonalizada('Error en la base de datos', 500);
    }
}
//# sourceMappingURL=error.message.js.map