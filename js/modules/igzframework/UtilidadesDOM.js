class UtilidadesDOM {
    // Métodos privados
    static #limpiarTexto(contenedor) {
        contenedor.text("");
    }

    // Métodos públicos
    static agregar(contenedor, elemento) {
        contenedor.append(elemento);
    }

    static crearFragmento() {
        return document.createDocumentFragment();
    }

    static existeEnDOM(elemento) {
        return $.contains(document.body, elemento[0]);
    }

    static modificarTexto(selector, texto) {
        const $contenedorTexto = $(selector);

        if (UtilidadesDOM.existeEnDOM($contenedorTexto)) {
            $contenedorTexto.text(texto);
        }
    }

    static mostrarError(selector, msj, miliSegundos = 10000) {
        const $contenedorDeError = $(selector);

        if (UtilidadesDOM.existeEnDOM($contenedorDeError)) {
            $contenedorDeError.text(`ERROR -> ${msj}`);

            $contenedorDeError.fadeIn("slow", function(){
                $contenedorDeError.fadeOut(miliSegundos, function() {
                    UtilidadesDOM.#limpiarTexto($contenedorDeError);
                });
            });
        }    
        else {
            throw `NO existe el contenedor de error llamado: ${selector}`;
        }
    }
}

export { UtilidadesDOM };