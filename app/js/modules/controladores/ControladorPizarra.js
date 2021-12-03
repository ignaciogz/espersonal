import { Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Usuario } from '../clases.js';
import { VistaPizarra } from '../vistas.js';
import { ModeloPizarra } from '../modelos.js';

class ControladorPizarra {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            const $contenedor = $('#contenedor-spa');
            ManejadorDOM.renderizar($contenedor, new VistaPizarra());
            
            new ModeloPizarra();
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorPizarra as controlador };