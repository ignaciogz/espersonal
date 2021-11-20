import { Excepcion } from '../../igzframework.js';

class obtenerDeFormulario extends Excepcion {
    constructor(elemento = "", selector) {
        super();
        this.elemento = elemento;
        this.selector = selector;
        
        this.nombre = "Obtener de formulario";
        this.lanzarExcepcion();
    }

    toString() {
        return `\n:: Excepción - ${this.nombre}: \n\n-> Elemento: ${this.elemento.toUpperCase()}\n-> Selector: "${this.selector}"`;
    }
}

export { obtenerDeFormulario as Excepcion_obtenerDeFormulario };