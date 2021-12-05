import { Excepcion_getAJAX, ManejadorExcepcion } from '../igzframework.js';

class Ajax {
    // Métodos privados
    static #getResponseTextJQXHR(responseText) {
        if (responseText) {
            const indexInicial = responseText.indexOf('<pre>') + '<pre>'.length;
            const indexFinal = responseText.indexOf('</pre>');
            
            return responseText.substring(indexInicial, indexFinal);
        }

        return responseText;
    }

    // Métodos públicos
    static getJQXHR(url, config = { async: true, dataType: "json" }) {
        const async = config.hasOwnProperty("async") ? config.async : true;
        const dataType = config.hasOwnProperty("dataType") ? config.dataType : "json";
        
        return  $.ajax({
                    async: async,
                    dataType: dataType,
                    type: "get",
                    url: url
                })
                .fail(
                    (data) => {
                        try {    
                            new Excepcion_getAJAX(url, data, Ajax.#getResponseTextJQXHR(data.responseText));
                        } catch(e) {
                            ManejadorExcepcion.generarLOG(e);
                        }
                    }
                );
    }
}

export { Ajax };