import { Item } from '../clases.js';
import { UtilidadesTabla } from '../igzframework.js';
import { Utilidades } from '../servicios.js';

class Tabla extends UtilidadesTabla {
    static #getValorDeLaCelda(fila, indexColumna) {
        const valor = Tabla.getContenedorDato(fila, indexColumna).text();
        
        return indexColumna !== 4 ? valor.trim() : Utilidades.desformatearMonto(valor);
    }

    static getItem(fila, itemID) {
        const icono = Tabla.#getValorDeLaCelda(fila, 0);
        const datoTipo = Item.getTipoDelIcono(icono);

        let datoCategoria = Tabla.#getValorDeLaCelda(fila, 1);
        datoCategoria = Item.getValorDeCategoriaDeTipo(datoTipo, datoCategoria);

        const datoNombre = Tabla.#getValorDeLaCelda(fila, 2);
        const datoMonto =  Tabla.#getValorDeLaCelda(fila, 4);
        
        return new Item(itemID, datoTipo, datoCategoria, datoNombre, datoMonto);
    }

    static fn_comparacion(indexColumna) {
        return (filaA, filaB) => {
            let valorA = Tabla.#getValorDeLaCelda($(filaA), indexColumna);
            let valorB = Tabla.#getValorDeLaCelda($(filaB), indexColumna);

            return Tabla.comparar(valorA, valorB);
        }
    }
}

export { Tabla };