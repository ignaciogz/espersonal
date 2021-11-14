import { UtilidadesDOM } from '../igzframework.js';
import { Utilidades } from '../servicios.js';

class ManejadorDOM extends UtilidadesDOM {
    static eliminarFila(fila, duracion = 2000) {
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
}

export { ManejadorDOM };