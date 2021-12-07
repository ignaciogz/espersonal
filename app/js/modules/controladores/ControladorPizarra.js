import { ManejadorDOM } from '../servicios.js';
import { VistaPizarra } from '../vistas.js';
import { ModeloPizarra } from '../modelos.js';

class ControladorPizarra {
    static ejecutar() {
        const $contenedor = $('#contenedor-spa');
        
        const datos = new ModeloPizarra();
        ManejadorDOM.renderizar($contenedor, new VistaPizarra(datos));
    }
}

export { ControladorPizarra as controlador };