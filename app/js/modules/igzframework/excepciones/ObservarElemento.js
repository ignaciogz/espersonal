import { Excepcion } from '../../igzframework.js';

class ObservarElemento extends Excepcion {
    constructor(selector, manejador, ...restantes) {
        super("Observar elemento DOM", ...restantes);
        this.selector = selector;
        this.manejador = manejador;
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Target", this.selector);
        this.setLineaInfo("Handler", `${this.manejador.name}()`);
    }
}

export { ObservarElemento as Excepcion_observarElemento };