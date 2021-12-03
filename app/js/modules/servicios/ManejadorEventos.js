import { UtilidadesEventos } from '../igzframework.js';

import * as handlers from '../funciones/handlers.js';

class ManejadorEventos extends UtilidadesEventos {
    static getHandler(handlerSolicitado) {
        return handlers[handlerSolicitado];
    }
}

export { ManejadorEventos };