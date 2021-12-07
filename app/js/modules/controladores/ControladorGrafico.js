import { ManejadorDOM } from '../servicios.js';
import { VistaGrafico } from '../vistas.js';
import { ModeloGrafico } from '../modelos.js';

class ControladorGrafico {
    static ejecutar() {
        const $contenedor = $('#contenedor-spa');
        
        const datos = new ModeloGrafico();
        ManejadorDOM.renderizar($contenedor, new VistaGrafico(datos));
    }
}

export { ControladorGrafico as controlador };