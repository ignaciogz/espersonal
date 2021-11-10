import { UtilidadesDOM } from '../igzframework.js';

class UtilidadesEvento {
    static asociar(elemento, evento, manejador) {
        const $elemento = $(elemento);
        
        if (UtilidadesDOM.existeEnDOM($elemento)) {
            $elemento.on(evento, manejador);
        }    
        else {
            throw `NO se pudo asociar el evento: ${evento} al elemento: ${elemento} cuyo manejador es: ${manejador.name}`;
        }
    }
}

export { UtilidadesEvento };