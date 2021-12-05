import { Excepcion } from '../../igzframework.js';

class obtenerDeFormulario extends Excepcion {
    constructor(elemento = "", selector, ...restantes) {
        super("Obtener de formulario", ...restantes);
        this.elemento = elemento;
        this.selector = selector;
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Elemento", this.elemento.toUpperCase());
        this.setLineaInfo("Selector", this.selector);
    }
}

export { obtenerDeFormulario as Excepcion_obtenerDeFormulario };