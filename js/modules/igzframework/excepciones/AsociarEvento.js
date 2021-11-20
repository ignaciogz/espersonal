import { Excepcion } from '../../igzframework.js';

class AsociarEvento extends Excepcion {
    constructor(selector, evento, manejador) {
        super();
        this.selector = selector;
        this.evento = evento;
        this.manejador = manejador;
        
        this.nombre = "Asociar evento";
        this.lanzarExcepcion();
    }

    toString() {
        return `\n:: Excepción - ${this.nombre}: \n\n-> Target: "${this.selector}" \n-> Event: "${this.evento}" \n-> Handler: ${this.manejador.name}()`;
    }
}

export { AsociarEvento as Excepcion_asociarEvento };