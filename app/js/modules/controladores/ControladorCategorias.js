import { ManejadorDOM } from '../servicios.js';
import { VistaCategorias } from '../vistas.js';
import { ModeloCategorias } from '../modelos.js';

class ControladorCategorias {
    static ejecutar() {
        const $contenedor = $('#contenedor-spa');

        const datos = new ModeloCategorias();
        ManejadorDOM.renderizar($contenedor, new VistaCategorias(datos));
    }
}

export { ControladorCategorias as controlador };