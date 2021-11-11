import { UtilidadesDOM } from '../igzframework.js';

class UtilidadesEvento {
    static asociar(elemento, evento, manejador) {
        const $elemento = $(elemento);
        
        if (UtilidadesDOM.existeEnDOM($elemento)) {
            $elemento.on(evento, manejador);
        }
    }

    static asociarAlUltimo(elemento, evento, manejador) {
        const $ultimoElemento = $(elemento).last();
        
        if (UtilidadesDOM.existeEnDOM($ultimoElemento)) {
            $ultimoElemento.on(evento, manejador);
        }
    }
}

export { UtilidadesEvento };