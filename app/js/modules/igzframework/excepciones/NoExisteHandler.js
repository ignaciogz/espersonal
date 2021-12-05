import { Excepcion } from '../../igzframework.js';

class NoExisteHandler extends Excepcion {
    constructor(handlerSolicitado, ...restantes) {
        super("No existe el handler solicitado", ...restantes);
        this.handlerSolicitado = handlerSolicitado;
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Handler solicitado", this.handlerSolicitado);
    }
}

export { NoExisteHandler as Excepcion_noExisteHandler };