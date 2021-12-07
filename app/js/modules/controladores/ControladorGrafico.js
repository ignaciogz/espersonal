import { ManejadorDOM } from '../servicios.js';
import { VistaGrafico } from '../vistas.js';
import { ModeloGrafico } from '../modelos.js';

class ControladorGrafico {
    static ejecutar() {
        const $contenedor = $('#contenedor-spa');
        ManejadorDOM.renderizar($contenedor, new VistaGrafico());

        new ModeloGrafico();
    }
}

export { ControladorGrafico as controlador };