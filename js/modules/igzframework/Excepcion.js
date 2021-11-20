import { App } from '../igzframework.js';

class Excepcion {    
    lanzarExcepcion() {
        if (App.modoDesarrollo()) {
            throw this.toString();
        }
    }
}

export { Excepcion };