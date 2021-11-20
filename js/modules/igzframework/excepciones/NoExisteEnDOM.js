import { Excepcion } from '../../igzframework.js';

class NoExisteEnDOM extends Excepcion {
    constructor(selector, metodo = "", clase = "") {
        super();
        this.selector = selector;
        this.metodo = metodo;
        this.clase = clase;
        
        this.nombre = "No existe en DOM el elemento";
        this.lanzarExcepcion();
    }

    toString() {
        const ejecutando = `\n-> Ejecutando: ${this.metodo}() dentro la clase ${this.clase}`;
        return `\n:: Excepción - ${this.nombre}: \n\n-> Selector: "${this.selector}"${ejecutando}`;
    }
}

export { NoExisteEnDOM as Excepcion_noExisteEnDOM };