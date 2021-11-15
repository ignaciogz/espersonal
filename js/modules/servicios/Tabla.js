import { Item } from '../clases.js';
import { UtilidadesTabla } from '../igzframework.js';
import { Utilidades } from '../servicios.js';

class Tabla extends UtilidadesTabla {
    static #getValorDeLaCelda(fila, indexColumna) {
        const valor = Tabla.getContenedorDato(fila, indexColumna).text();
        
        return indexColumna !== 4 ? valor.trim() : Utilidades.desformatearMonto(valor);
    }

    static animarFilaAgregada(fila, duracion = 1400) {
        fila.hide()
            .fadeIn(duracion);
    }

    static animarFilaEliminada(fila, duracion = 1400) {
        fila.find('i').hide();
        fila.find('.btn-edit').hide();
        fila.find('.btn-delete').hide();

        fila.css({ 
                "color":"#d32f2f",
                "font-weight":"normal",
                "text-decoration":"line-through",
            })
            .delay(duracion)
            .fadeOut(duracion);
    }

    static animarFilaReemplazada(fila, duracion = 500) {
        const contenedorIcono = Tabla.getContenedorDato(fila, 0);
        const contenedorCategoria = Tabla.getContenedorDato(fila, 1);
        const contenedorNombre = Tabla.getContenedorDato(fila, 2);
        const contenedorBotones = Tabla.getContenedorDato(fila, 3);
        const contenedorMonto = Tabla.getContenedorDato(fila, 4);

        contenedorCategoria.hide();
        contenedorNombre.hide();
        contenedorBotones.hide();
        contenedorMonto.hide();

        contenedorIcono.fadeIn(duracion, function () {
            contenedorCategoria.fadeIn(duracion, function () {
                contenedorNombre.fadeIn(duracion, function () {
                    contenedorBotones.fadeIn(duracion, function () {
                        contenedorMonto.fadeIn(duracion);
                    });
                });
            });
        });
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