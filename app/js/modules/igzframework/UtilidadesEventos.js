import { UtilidadesDOM } from '../igzframework.js';
import { Excepcion_asociarEvento } from '../igzframework.js';

class UtilidadesEventos {
    static #asociar($elemento, evento, manejador, selector) {
        if (UtilidadesDOM.existe($elemento)) {
            $elemento.on(evento, manejador);
        }
        else {
            new Excepcion_asociarEvento(selector, evento, manejador);
        }
    }

    static asociar(elemento, evento, manejador) {
        const $elemento = $(elemento);
        UtilidadesEventos.#asociar($elemento, evento, manejador, elemento);
    }

    static asociarAlSubElemento(elemento, subElemento, evento, manejador) {
        const $subElemento = $(elemento).find(subElemento);
        UtilidadesEventos.#asociar($subElemento, evento, manejador, subElemento);
    }

    static asociarAlUltimo(elemento, evento, manejador) {
        const $ultimoElemento = $(elemento).last();
        UtilidadesEventos.#asociar($ultimoElemento, evento, manejador, elemento);
    }
}

export { UtilidadesEventos };