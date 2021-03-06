import { UtilidadesDOM, Video } from '../igzframework.js';
import { Utilidades } from '../servicios.js';
import { Tabla } from '../clases.js';

class ManejadorDOM extends UtilidadesDOM {
    static agregarFila(pizarraSeleccionada, registroItem) {
        const $filaNueva = $(registroItem);
        ManejadorDOM.agregar(pizarraSeleccionada, $filaNueva);
        Tabla.animarFilaAgregada($filaNueva);
    }

    static agregarInfoGraficoVacio(vista, selector, info) {
        const infoGraficoVacio =    `<div class="col s12 center-align">
                                        ${info}
                                    </div>`;

        const $contenedor = $(vista).find(selector);
        ManejadorDOM.renderizar($contenedor, infoGraficoVacio);
    }

    static agregarInfoPizarraVacia(vista = null) {
        const selector = '#pizarra-seleccionada';
        const infoPizarraVacia =    `<td id="info-pizarra-vacia" class="center-align" colspan="5">
                                        Use el botón de la esquina inferior derecha de su pantalla para agregar un item.
                                    </td>`;

        if(vista) {
            ManejadorDOM.agregarContenidoAlSubElemento(vista, selector, infoPizarraVacia);
        } else {
            ManejadorDOM.agregar($(selector), infoPizarraVacia);
        }
    }

    static cambiarVelocidadDeReproduccionDeVideo(vista, selector, velocidad) {
        const $video = $(vista).find(selector);
        Video.cambiarVelocidadDeReproduccion($video, velocidad);
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
    
    static mostrarInfoPizarra(pizarra) {
        ManejadorDOM.modificarTexto('#total-de-items', pizarra.getCantidadDeItems());
        ManejadorDOM.modificarTexto('#total-ingresos', Utilidades.formatearMonto(pizarra.getTotalIngresos()));
        ManejadorDOM.modificarTexto('#total-egresos', Utilidades.formatearMonto(pizarra.getTotalEgresos()));
        ManejadorDOM.modificarTexto('#balance', Utilidades.formatearMonto(pizarra.getBalance()));
    }

    static notificarErrorAlUsuario(mensaje) {
        M.toast({html: `ERROR -> ${mensaje}`, classes: 'notificacion red darken-2'});
    }

    static quitarInfoPizarraVacia() {
        const $infoPizarraVacia = $('#info-pizarra-vacia');
        ManejadorDOM.eliminar($infoPizarraVacia);
    }

    static reemplazarFila(fila, registroItem) {
        const $filaNueva = $(registroItem);
        ManejadorDOM.reemplazar(fila, $filaNueva);
        Tabla.animarFilaReemplazada($filaNueva);
    }
}

export { ManejadorDOM };