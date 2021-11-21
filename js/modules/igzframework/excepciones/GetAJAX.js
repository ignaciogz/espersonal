import { Excepcion } from '../../igzframework.js';

class GetAJAX extends Excepcion {
    constructor(url, data, responseText) {
        super();
        this.url = url;
        this.data = data;
        this.responseText = responseText;

        this.verificarEstadoDeComunicacion();
        
        this.nombre = "La petición GET de AJAX falló";
        this.msj = new String();
        this.lanzarExcepcion();
    }

    verificarEstadoDeComunicacion() {
        if (this.data.status == 0) {
            this.responseText = "Error de comunicación, la URL NO responde [VERIFICARLA]";
        }
    }

    toString() {
        this.agregarLineaInfo("Status code", `${this.data.status} "${this.data.statusText}"`);
        this.agregarLineaInfo("URL", this.url);
        this.agregarLineaInfo("Response text", this.responseText);

        return this.mostrarInfo();
    }
}

export { GetAJAX as Excepcion_getAJAX };