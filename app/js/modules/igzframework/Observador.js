import { ManejadorExcepcion, UtilidadesDOM } from '../igzframework.js';
import { Excepcion_observarElemento } from '../igzframework.js';

class Observador {
    static #escuchar(elemento, manejador, opcionesDeEscucha = { childList: true, subtree: true }, selector) {
        try {
            if(UtilidadesDOM.existe(elemento)){
                const observador_itemsDePizarra = new MutationObserver(manejador);
                observador_itemsDePizarra.observe(elemento[0], opcionesDeEscucha);
            }
            else {
                new Excepcion_observarElemento(selector, manejador);
            }
        } catch(e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }

    static escuchar(elemento, manejador, opcionesDeEscucha) {
        const $elemento = $(elemento);
        Observador.#escuchar($elemento, manejador, opcionesDeEscucha, elemento);
    }

    static escucharAlSubElemento(elemento, subElemento, manejador, opcionesDeEscucha) {
        const $subElemento = $(elemento).find(subElemento);
        Observador.#escuchar($subElemento, manejador, opcionesDeEscucha, subElemento);
    }
}

export { Observador };