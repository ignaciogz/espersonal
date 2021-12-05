import { UtilidadesEventos } from '../igzframework.js';
import { Excepcion_noExisteHandler } from '../igzframework.js';

import * as handlers from '../funciones/handlers.js';

class ManejadorEventos extends UtilidadesEventos {
    static getHandler(handlerSolicitado) {
        const handler = handlers[handlerSolicitado];
        
        if(!handler) {
            new Excepcion_noExisteHandler(handlerSolicitado);
        }
        
        return handler;
    }
}

export { ManejadorEventos };