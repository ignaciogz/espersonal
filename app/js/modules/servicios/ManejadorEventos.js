import { UtilidadesEvento } from '../igzframework.js';

import * as handlers from '../funciones/handlers.js';

class ManejadorEventos extends UtilidadesEvento {
    static getHandler(handlerSolicitado) {
        return handlers[handlerSolicitado];
    }
}

export { ManejadorEventos };