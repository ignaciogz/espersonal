import { Excepcion } from '../../igzframework.js';

class AsociarEvento extends Excepcion {
    constructor(selector, evento, manejador, ...restantes) {
        super("Asociar evento", ...restantes);
        this.selector = selector;
        this.evento = evento;
        this.manejador = manejador;
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Target", this.selector);
        this.setLineaInfo("Event", this.evento);
        this.setLineaInfo("Handler", `${this.manejador.name}()`);
    }
}

export { AsociarEvento as Excepcion_asociarEvento };