import { Excepcion } from '../../igzframework.js';

class ObservarElementoDOM extends Excepcion {
    constructor(manejador) {
        super();
        this.manejador = manejador;
        
        this.nombre = "Observar elemento DOM";
        this.msj = new String();
        this.lanzarExcepcion();
    }

    toString() {
        this.agregarLineaInfo("Handler", `${this.manejador.name}()`);

        return this.mostrarInfo();
    }
}

export { ObservarElementoDOM as Excepcion_observarElementoDOM };