import { Excepcion_noExisteEnDOM } from '../igzframework.js';

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

    static eliminar(elemento) {
        elemento.remove();
    }

    static existeEnDOM(elemento) {
        return $.contains(document.body, elemento[0]);
    }

    static modificarTexto(selector, texto) {
        const $contenedorTexto = $(selector);

        if (UtilidadesDOM.existeEnDOM($contenedorTexto)) {
            $contenedorTexto.text(texto);
        }
        else {
            new Excepcion_noExisteEnDOM(selector, UtilidadesDOM.modificarTexto.name, UtilidadesDOM.name);
        }
    }

    static mostrarError(selector, msj, duracion = 8000) {
        const $contenedorDeError = $(selector);

        if (UtilidadesDOM.existeEnDOM($contenedorDeError)) {
            $contenedorDeError.text(`ERROR -> ${msj}`);

            $contenedorDeError.slideDown("slow", function(){
                $contenedorDeError.fadeOut(duracion, function() {
                    UtilidadesDOM.#limpiarTexto($contenedorDeError);
                    $contenedorDeError.hide();
                });
            });
        }    
        else {
            new Excepcion_noExisteEnDOM(selector, UtilidadesDOM.mostrarError.name, UtilidadesDOM.name);
        }
    }

    static reemplazar(elementoInicial, elemento) {
        elementoInicial.replaceWith(elemento);
    }

    static renderizar(contenedor, elemento) {
        contenedor.html(elemento);
    }

    static tituloDePagina(titulo) {
        document.title = titulo;
    }
}

export { UtilidadesDOM };