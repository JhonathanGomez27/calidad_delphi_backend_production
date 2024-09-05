import { PuntuacionService } from './puntuacion.service';
export declare class PuntuacionController {
    private readonly puntuacionService;
    constructor(puntuacionService: PuntuacionService);
    correctPunctuation(text: string, res: any): Promise<any>;
}
