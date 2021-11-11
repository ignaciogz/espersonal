import { UtilidadesTabla } from '../igzframework.js';
import { Utilidades } from '../servicios.js';

class Tabla extends UtilidadesTabla {
    static #getValorDeLaCelda(fila, indexColumna) {
        const valor = $(fila).children('td').eq(indexColumna).html();
        
        return indexColumna !== 4 ? valor : Utilidades.desformatearMonto(valor);
    }

    static fn_comparacion(indexColumna) {
        return (filaA, filaB) => {
            let valorA = Tabla.#getValorDeLaCelda(filaA, indexColumna);
            let valorB = Tabla.#getValorDeLaCelda(filaB, indexColumna);

            return Tabla.comparar(valorA, valorB);
        }
    }
}

export { Tabla };