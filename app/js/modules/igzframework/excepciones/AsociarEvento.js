import { Excepcion } from '../../igzframework.js';

class AsociarEvento extends Excepcion {
    constructor(selector, evento, manejador) {
        super();
        this.selector = selector;
        this.evento = evento;
        this.manejador = manejador;
        
        this.nombre = "Asociar evento";
        this.msj = new String();
        this.lanzarExcepcion();
    }

    toString() {
        this.agregarLineaInfo("Target", this.selector);
        this.agregarLineaInfo("Event", this.evento);
        this.agregarLineaInfo("Handler", `${this.manejador.name}()`);

        return this.mostrarInfo();
    }
}

export { AsociarEvento as Excepcion_asociarEvento };