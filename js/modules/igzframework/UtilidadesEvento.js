import { UtilidadesDOM } from '../igzframework.js';

class UtilidadesEvento {
    static #asociar($elemento, evento, manejador, selector) {
        if (UtilidadesDOM.existeEnDOM($elemento)) {
            $elemento.on(evento, manejador);
        }
        else {
            throw `NO se pudo asociar el evento: \n\tDISPARADOR -> ${selector} \n\tEVENTO -> ${evento} \n\tMANEJADOR -> ${manejador.name}()`;
        }
    }

    static asociar(elemento, evento, manejador) {
        const $elemento = $(elemento);
        UtilidadesEvento.#asociar($elemento, evento, manejador, elemento);
    }

    static asociarAlSubElemento(elemento, subElemento, evento, manejador) {
        const $subElemento = $(elemento).find(subElemento);
        UtilidadesEvento.#asociar($subElemento, evento, manejador, elemento);
    }

    static asociarAlUltimo(elemento, evento, manejador) {
        const $ultimoElemento = $(elemento).last();
        UtilidadesEvento.#asociar($ultimoElemento, evento, manejador, elemento);
    }
}

export { UtilidadesEvento };