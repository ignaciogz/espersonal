import { App } from '../igzframework.js';

class Excepcion {
    static nLineaInfo = '\n-> ';

    agregarLineaInfo(clave, valor) {
        this.msj += Excepcion.nLineaInfo + `${clave}: ${valor}`;
    }

    getInfo() {
        return this.msj;
    }

    mostrarInfo() {
        return `\n:: Excepción - ${this.nombre}:\n${this.getInfo()}`;
    }

    lanzarExcepcion() {
        if (App.modoDesarrollo()) {
            throw this.toString();
        }
    }
}

export { Excepcion };