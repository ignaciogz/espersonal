import { Excepcion } from '../../igzframework.js';

class GetAJAX extends Excepcion {
    constructor(url, data, responseText, ...restantes) {
        super("La petición GET de AJAX falló", ...restantes);
        this.url = url;
        this.data = data;
        this.responseText = responseText;

        this.verificarEstadoDeComunicacion();
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Status code", `${this.data.status} "${this.data.statusText}"`);
        this.setLineaInfo("URL", this.url);
        this.setLineaInfo("Response text", this.responseText);
    }

    verificarEstadoDeComunicacion() {
        if (this.data.status == 0) {
            this.responseText = "Error de comunicación, la URL NO responde [VERIFICARLA]";
        }
    }
}

export { GetAJAX as Excepcion_getAJAX };