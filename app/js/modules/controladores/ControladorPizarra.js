import { ManejadorDOM } from '../servicios.js';
import { VistaPizarra } from '../vistas.js';
import { ModeloPizarra } from '../modelos.js';

class ControladorPizarra {
    static ejecutar() {
        const $contenedor = $('#contenedor-spa');
        ManejadorDOM.renderizar($contenedor, new VistaPizarra());
            
        new ModeloPizarra();
    }
}

export { ControladorPizarra as controlador };