import { Excepcion } from '../../igzframework.js';

class NoExisteEnDOM extends Excepcion {
    constructor(selector, metodo = "", clase = "", ...restantes) {
        super("No existe en DOM el elemento", ...restantes);
        this.selector = selector;
        this.metodo = metodo;
        this.clase = clase;
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Selector", this.selector);
        this.setLineaInfo("Ejecutando", `${this.metodo}() dentro la clase ${this.clase}`);
    }
}

export { NoExisteEnDOM as Excepcion_noExisteEnDOM };