import { App } from '../igzframework.js';

class Ajax {
    // Métodos privados
    static #getResponseTextJQXHR(responseText) {
        const indexInicial = responseText.indexOf('<pre>') + '<pre>'.length;
        const indexFinal = responseText.indexOf('</pre>');
        
        return responseText.substring(indexInicial, indexFinal);                   
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
                    (data, textStatus) => {
                        let msjError = `:: La petición AJAX falló: ${textStatus}\n`;
                        msjError += `\n-> Status code: "${data.status} - ${data.statusText}"`;
                        msjError += `\n-> Response text: "${Ajax.#getResponseTextJQXHR(data.responseText)}"`;

                        if (App.modoDesarrollo()) {
                            throw msjError;
                        }
                    }
                );
    }
}

export { Ajax };