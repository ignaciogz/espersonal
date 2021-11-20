import { Excepcion } from '../../igzframework.js';

class GetAJAX extends Excepcion {
    constructor(url, data, responseText) {
        super();
        this.url = url;
        this.data = data;
        this.responseText = responseText;

        this.verificarEstadoDeComunicacion();
        
        this.nombre = "La petición GET de AJAX falló";
        this.lanzarExcepcion();
    }

    verificarEstadoDeComunicacion() {
        if (this.data.status == 0) {
            this.responseText = "Error de comunicación, la URL NO responde [VERIFICARLA]";
        }
    }

    toString() {
        let msj = `\n-> Status code: ${this.data.status} "${this.data.statusText}"`;
        msj += `\n-> URL: "${this.url}"`;
        msj += `\n-> Response text: "${this.responseText}"`;

        return `\n:: Excepción - ${this.nombre}:\n${msj}`;
    }
}

export { GetAJAX as Excepcion_getAJAX };