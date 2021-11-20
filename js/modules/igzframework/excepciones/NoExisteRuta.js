import { Excepcion } from '../../igzframework.js';

class NoExisteRuta extends Excepcion {
    constructor(paginaActual) {
        super();
        this.paginaActual = paginaActual;
        
        this.nombre = "No existe ruta asociada, a la página solicitada";
        this.lanzarExcepcion();
    }

    toString() {
        return `\n:: Excepción - ${this.nombre}: \n\n-> Página solicitada: "${this.paginaActual}"`;
    }
}

export { NoExisteRuta as Excepcion_noExisteRuta };