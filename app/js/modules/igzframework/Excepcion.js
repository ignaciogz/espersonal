import { App } from '../igzframework.js';

class Excepcion extends Error {
    static nLineaInfo = '\n-> ';

    constructor(name, ...restantes) {
        // Paso los argumentos restantes (incluidos los específicos del proveedor) a la clase predefinida en JS: Error
        super(...restantes);

        // Activo el seguimiento adecuado de la pila, para saber el lugar donde se lanzó la excepción (solo disponible en V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Excepcion);
        }

        // Modifico la información de depuración, de la interfaz heredada Error
        this.name = name;

        // Agrego información de depuración personalizada
        this.date = new Date();

        // Inicializo el contenedor de información de depuración
        this.info = new String();
    }

    getInfo() {
        return this.info;
    }

    setLineaInfo(clave, valor) {
        this.info += Excepcion.nLineaInfo + `${clave}: ${valor}`;
    }

    lanzarExcepcion() {
        if (App.modoDesarrollo()) {
            // Modifico la información de depuración, de la interfaz heredada Error. A partir de los hijos de Excepcion
            this.message = this.getInfo();
            
            throw this;
        }
    }
}

export { Excepcion };