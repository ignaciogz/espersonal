import { UtilidadesDOM } from '../igzframework.js';
import { Tabla, Utilidades } from '../servicios.js';

class ManejadorDOM extends UtilidadesDOM {
    static agregarFila($pizarraSeleccionada, registroItem, duracion = 1400) {
        ManejadorDOM.agregar($pizarraSeleccionada, registroItem);
        
        const $ultimoRegistro = $pizarraSeleccionada.find('tr').last();
        $ultimoRegistro.hide()
                       .fadeIn(duracion);
    }

    static eliminarFila(fila, duracion = 1400) {
        fila.find('i').hide();
        fila.find('.btn-edit').hide();
        fila.find('.btn-delete').hide();

        fila.css({ 
                "color":"#d32f2f",
                "font-weight":"normal",
                "text-decoration":"line-through",
            })
            .delay(duracion)
            .fadeOut(duracion, function () {
                ManejadorDOM.eliminar(fila);
            });
    }
    
    static mostrarInformacionPizarra(pizarra) {
        ManejadorDOM.modificarTexto('#total-de-items', pizarra.getCantidadDeItems());
        ManejadorDOM.modificarTexto('#total-ingresos', Utilidades.formatearMonto(pizarra.getTotalIngresos()));
        ManejadorDOM.modificarTexto('#total-egresos', Utilidades.formatearMonto(pizarra.getTotalEgresos()));
        ManejadorDOM.modificarTexto('#balance', Utilidades.formatearMonto(pizarra.calcularBalance()));
    }

    static mostrarNombreDeUsuario(usuario) {
        ManejadorDOM.modificarTexto('#usuario-logeado', usuario.nombre);
    }

    static mostrarNombrePizarra(pizarra) {
        ManejadorDOM.modificarTexto('#pizarra-nombre', pizarra.fecha);
    }

    static reemplazarFila(fila, registroItem, duracion = 500) {
        const filaNueva = $(registroItem);
        ManejadorDOM.reemplazar(fila, filaNueva);
        
        const contenedorIcono = Tabla.getContenedorDato(filaNueva, 0);
        const contenedorCategoria = Tabla.getContenedorDato(filaNueva, 1);
        const contenedorNombre = Tabla.getContenedorDato(filaNueva, 2);
        const contenedorBotones = Tabla.getContenedorDato(filaNueva, 3);
        const contenedorMonto = Tabla.getContenedorDato(filaNueva, 4);

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
}

export { ManejadorDOM };