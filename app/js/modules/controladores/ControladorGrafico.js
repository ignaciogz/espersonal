import { Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Usuario } from '../clases.js';
import { VistaGrafico } from '../vistas.js';
import { ModeloGrafico } from '../modelos.js';

class ControladorGrafico {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            const $contenedor = $('#contenedor-app');
            ManejadorDOM.renderizar($contenedor, new VistaGrafico());

            new ModeloGrafico();
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorGrafico as controlador };