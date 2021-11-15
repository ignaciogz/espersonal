import { UtilidadesDOM } from '../igzframework.js';
import { Tabla, Utilidades } from '../servicios.js';

class ManejadorDOM extends UtilidadesDOM {
    static agregarFila($pizarraSeleccionada, registroItem) {
        const filaNueva = $(registroItem);
        ManejadorDOM.agregar($pizarraSeleccionada, filaNueva);
        Tabla.animarFilaAgregada(filaNueva);
    }

    static eliminarFila(fila) {
        Tabla.animarFilaEliminada(fila);
        ManejadorDOM.eliminar(fila);
    }
    
    static mostrarInformacionPizarra(pizarra) {
        ManejadorDOM.modificarTexto('#total-de-items', pizarra.getCantidadDeItems());
        ManejadorDOM.modificarTexto('#total-ingresos', Utilidades.formatearMonto(pizarra.getTotalIngresos()));
        ManejadorDOM.modificarTexto('#total-egresos', Utilidades.formatearMonto(pizarra.getTotalEgresos()));
        ManejadorDOM.modificarTexto('#balance', Utilidades.formatearMonto(pizarra.calcularBalance()));
    }

    static mostrarIconoDeOrdenamiento(elemento, asc) {
        Tabla.setIconoDeOrdenamiento(elemento,asc);
    }

    static mostrarNombreDeUsuario(usuario) {
        ManejadorDOM.modificarTexto('#usuario-logeado', usuario.nombre);
    }

    static mostrarNombrePizarra(pizarra) {
        ManejadorDOM.modificarTexto('#pizarra-nombre', pizarra.fecha);
    }

    static reemplazarFila(fila, registroItem) {
        const filaNueva = $(registroItem);
        ManejadorDOM.reemplazar(fila, filaNueva);
        Tabla.animarFilaReemplazada(filaNueva);
    }
}

export { ManejadorDOM };