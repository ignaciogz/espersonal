import { Excepcion } from '../../igzframework.js';

class NoExisteRuta extends Excepcion {
    constructor(paginaActual, ...restantes) {
        super("No existe ruta asociada, a la página solicitada. [Dentro del archivo de configuración]", ...restantes);
        this.paginaActual = paginaActual;
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Página solicitada", this.paginaActual);
    }
}

export { NoExisteRuta as Excepcion_noExisteRuta };