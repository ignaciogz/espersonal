import { Excepcion } from '../../igzframework.js';

class ObservarElementoDOM extends Excepcion {
    constructor(manejador, ...restantes) {
        super("Observar elemento DOM", ...restantes);
        this.manejador = manejador;
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Handler", `${this.manejador.name}()`);
    }
}

export { ObservarElementoDOM as Excepcion_observarElementoDOM };