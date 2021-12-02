import { UtilidadesDOM } from '../igzframework.js';
import { Excepcion_observarElementoDOM } from '../igzframework.js';

class Observador {
    static escuchar($selector, manejador, opcionesDeEscucha = { childList: true, subtree: true }) {
        if (UtilidadesDOM.existeEnDOM($selector)) {
            const observador_itemsDePizarra = new MutationObserver(manejador);
            observador_itemsDePizarra.observe($selector[0], opcionesDeEscucha);
        }
        else {
            new Excepcion_observarElementoDOM(manejador);
        }
    }
}

export { Observador };