import { Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Usuario } from '../clases.js';
import { ModeloSPA } from '../modelos.js';

import { ControladorFrontal } from './ControladorFrontal.js';

class ControladorSPA {
    static ejecutar(instanciaApp) {
        if (Usuario.estaLogeado()) {
            const datos = new ModeloSPA();

            $.when( datos.pizarras.onReady(), datos.categorias.onReady(), datos.grafico.onReady() )
            .done(() => {
                    // Luego de CONSUMIR por única vez de forma ASÍNCRONA, los JSON de: pizarras, categorías y configuración del gráfico.
                    // El ControladorSPA delega el control al ControladorFrontal:
                    ControladorFrontal.ejecutar(instanciaApp);
            }).fail(() => {
                    ManejadorDOM.notificarErrorAlUsuario("Carga inicial")
            });
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorSPA };