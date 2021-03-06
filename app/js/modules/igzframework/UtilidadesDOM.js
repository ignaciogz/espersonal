import { Excepcion_noExisteEnDOM } from '../igzframework.js';

class UtilidadesDOM {
    // Métodos privados
    static #limpiarTexto(contenedor) {
        contenedor.text("");
    }

    // Métodos públicos
    static agregar(elemento, contenido) {
        elemento.append(contenido);
    }

    static agregarContenidoAlSubElemento(elemento, subElemento, contenido) {
        const $subElemento = $(elemento).find(subElemento);
        UtilidadesDOM.agregar($subElemento, contenido);
    }

    static crearFragmento() {
        return new DocumentFragment();
    }

    static eliminar(elemento) {
        elemento.remove();
    }

    static existe(elemento) {
        return elemento.length ? true : false;
    }

    static existeEnDOM(elemento) {
        return elemento.is($(window)) ? true : $.contains(document.body, elemento[0]);
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
            $contenedorDeError.text(msj);

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

    static tituloDelDocumento(titulo) {
        document.title = titulo;
    }
}

export { UtilidadesDOM };