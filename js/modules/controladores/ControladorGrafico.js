import { App, Navegador } from '../igzframework.js';

class ControladorGrafico {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            // VEREMOS si lo programo o no

            App.inicializarDependencia('Materialize');
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorGrafico as controlador };