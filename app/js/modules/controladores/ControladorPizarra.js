import { ManejadorExcepcion } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { ModeloPizarra } from '../modelos.js';
import { VistaPizarra } from '../vistas.js';

class ControladorPizarra {
    static ejecutar() {
        try {
            const $contenedor = $('#contenedor-spa main');

            const datos = new ModeloPizarra();
            ManejadorDOM.renderizar($contenedor, new VistaPizarra(datos));
        } catch (e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ControladorPizarra as controlador };