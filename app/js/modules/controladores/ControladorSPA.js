import { Navegador } from '../igzframework.js';
import { Usuario } from '../clases.js';
import { ModeloSPA } from '../modelos.js';

import { ControladorFrontal } from './ControladorFrontal.js';

class ControladorSPA {
    static ejecutar(instanciaApp) {
        if (Usuario.estaLogeado()) {
            const datos = new ModeloSPA();

            $.when( datos.pizarras.onReady(), datos.categorias.onReady() ).always(() => {
                // Luego de CONSUMIR por única vez de forma ASÍNCRONA, los JSON de: pizarras y categorías.
                // El ControladorSPA delega el control al ControladorFrontal:
                ControladorFrontal.ejecutar(instanciaApp);
            });
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorSPA };