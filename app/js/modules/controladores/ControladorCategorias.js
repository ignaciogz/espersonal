import { Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Usuario } from '../clases.js';
import { VistaCategorias } from '../vistas.js';
import { ModeloCategorias } from '../modelos.js';

class ControladorCategorias {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            const contenedor = $('#contenedor-app');
            ManejadorDOM.renderizar(contenedor, new VistaCategorias());
            
            new ModeloCategorias();   
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorCategorias as controlador };