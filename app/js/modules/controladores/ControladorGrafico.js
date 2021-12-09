import { ManejadorExcepcion } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { ModeloGrafico } from '../modelos.js';
import { VistaGrafico } from '../vistas.js';

class ControladorGrafico {
    static ejecutar() {
        try {
            const $contenedor = $('#contenedor-spa main');
            
            const datos = new ModeloGrafico();
            ManejadorDOM.renderizar($contenedor, new VistaGrafico(datos));
        } catch (e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ControladorGrafico as controlador };