import { Excepcion } from '../../igzframework.js';

class NoExisteEnDOM extends Excepcion {
    constructor(selector, metodo = "", clase = "") {
        super();
        this.selector = selector;
        this.metodo = metodo;
        this.clase = clase;
        
        this.nombre = "No existe en DOM el elemento";
        this.msj = new String();
        this.lanzarExcepcion();
    }

    toString() {
        this.agregarLineaInfo("Selector", this.selector);
        this.agregarLineaInfo("Ejecutando", `${this.metodo}() dentro la clase ${this.clase}`);

        return this.mostrarInfo();
        
    }
}

export { NoExisteEnDOM as Excepcion_noExisteEnDOM };