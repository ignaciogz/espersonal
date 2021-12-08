import { ManejadorExcepcion } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { ModeloCategorias } from '../modelos.js';
import { VistaCategorias } from '../vistas.js';

class ControladorCategorias {
    static ejecutar() {
        try {
            const $contenedor = $('#contenedor-spa');

            const datos = new ModeloCategorias();
            ManejadorDOM.renderizar($contenedor, new VistaCategorias(datos));
        } catch (e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ControladorCategorias as controlador };