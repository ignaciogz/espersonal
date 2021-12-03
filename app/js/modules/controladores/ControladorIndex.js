import { Navegador } from '../igzframework.js';
import { Usuario } from '../clases.js';
import { ModeloIndex } from '../modelos.js';

class ControladorIndex {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            Navegador.redireccionar("app/index.html");
        } else {
            new ModeloIndex();
        }
    }
}

export { ControladorIndex as controlador };