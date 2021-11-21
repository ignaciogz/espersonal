import { Excepcion } from '../../igzframework.js';

class NoExisteRuta extends Excepcion {
    constructor(paginaActual) {
        super();
        this.paginaActual = paginaActual;
        
        this.nombre = "No existe ruta asociada, a la página solicitada";
        this.msj = new String();
        this.lanzarExcepcion();
    }

    toString() {
        this.agregarLineaInfo("Página solicitada", this.paginaActual);
        
        return this.mostrarInfo();
    }
}

export { NoExisteRuta as Excepcion_noExisteRuta };