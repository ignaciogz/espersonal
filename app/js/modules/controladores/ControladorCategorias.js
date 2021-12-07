import { ManejadorDOM } from '../servicios.js';
import { VistaCategorias } from '../vistas.js';
import { ModeloCategorias } from '../modelos.js';

class ControladorCategorias {
    static ejecutar() {
        const $contenedor = $('#contenedor-spa');
        ManejadorDOM.renderizar($contenedor, new VistaCategorias());
            
        new ModeloCategorias();
    }
}

export { ControladorCategorias as controlador };