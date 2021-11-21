import { Excepcion } from '../../igzframework.js';

class obtenerDeFormulario extends Excepcion {
    constructor(elemento = "", selector) {
        super();
        this.elemento = elemento;
        this.selector = selector;
        
        this.nombre = "Obtener de formulario";
        this.msj = new String();
        this.lanzarExcepcion();
    }

    toString() {
        this.agregarLineaInfo("Elemento", this.elemento.toUpperCase());
        this.agregarLineaInfo("Selector", this.selector);

        return this.mostrarInfo();
    }
}

export { obtenerDeFormulario as Excepcion_obtenerDeFormulario };