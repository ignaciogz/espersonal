import { Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Usuario } from '../clases.js';
import { VistaIndex } from '../vistas.js';
import { ModeloIndex } from '../modelos.js';

class ControladorIndex {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            Navegador.redireccionar("app/index.html");
        } else {
            const $contenedor = $('#contenedor-index');
            ManejadorDOM.renderizar($contenedor, new VistaIndex());

            new ModeloIndex();
        }
    }
}

export { ControladorIndex as controlador };