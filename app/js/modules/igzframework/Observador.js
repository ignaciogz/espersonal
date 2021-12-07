import { ManejadorExcepcion } from '../igzframework.js';

class Observador {
    static #escuchar(elemento, manejador, opcionesDeEscucha) {
        try {
            const observador_itemsDePizarra = new MutationObserver(manejador);
            observador_itemsDePizarra.observe(elemento[0], opcionesDeEscucha);
        } catch(e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }

    static escuchar(elemento, manejador, opcionesDeEscucha = { childList: true, subtree: true }) {
        const $elemento = $(elemento);
        Observador.#escuchar($elemento, manejador, opcionesDeEscucha);
    }

    static escucharAlSubElemento(elemento, subElemento, manejador, opcionesDeEscucha = { childList: true, subtree: true }) {
        const $subElemento = $(elemento).find(subElemento);
        Observador.#escuchar($subElemento, manejador, opcionesDeEscucha);
    }
}

export { Observador };