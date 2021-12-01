import { UtilidadesDOM } from '../igzframework.js';
import { Utilidades } from '../servicios.js';
import { Tabla } from '../clases.js';

class ManejadorDOM extends UtilidadesDOM {
    static agregarFila(pizarraSeleccionada, registroItem) {
        const $filaNueva = $(registroItem);
        ManejadorDOM.agregar(pizarraSeleccionada, $filaNueva);
        Tabla.animarFilaAgregada($filaNueva);
    }

    static eliminarFila(fila) {
        function fn_finalizacion() {
            ManejadorDOM.eliminar(fila);
        }
        Tabla.animarFilaEliminada(fila, fn_finalizacion);
    }

    static mostrarIconoDeOrdenamiento(elemento, asc) {
        Tabla.setIconoDeOrdenamiento(elemento,asc);
    }
    
    static mostrarInformacionPizarra(pizarra) {
        ManejadorDOM.modificarTexto('#total-de-items', pizarra.getCantidadDeItems());
        ManejadorDOM.modificarTexto('#total-ingresos', Utilidades.formatearMonto(pizarra.getTotalIngresos()));
        ManejadorDOM.modificarTexto('#total-egresos', Utilidades.formatearMonto(pizarra.getTotalEgresos()));
        ManejadorDOM.modificarTexto('#balance', Utilidades.formatearMonto(pizarra.getBalance()));
    }

    static mostrarNombreDeUsuario(usuario) {
        ManejadorDOM.modificarTexto('#usuario-logeado', usuario.nombre);
    }

    static mostrarNombrePizarra(pizarra) {
        ManejadorDOM.modificarTexto('#pizarra-nombre', pizarra.fecha);
    }

    static reemplazarFila(fila, registroItem) {
        const $filaNueva = $(registroItem);
        ManejadorDOM.reemplazar(fila, $filaNueva);
        Tabla.animarFilaReemplazada($filaNueva);
    }
}

export { ManejadorDOM };