import { ConfigType } from '@nestjs/config';
import config from 'src/config';
export declare class PuntuacionService {
    private token;
    private openai;
    constructor(configService: ConfigType<typeof config>);
    correctPunctuation(text: string): Promise<any>;
}
