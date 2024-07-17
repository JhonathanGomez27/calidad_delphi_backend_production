import { HttpException } from '@nestjs/common';
export declare class MiExcepcionPersonalizada extends HttpException {
    constructor(mensaje: string, statusCode: number);
}
