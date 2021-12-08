import { ManejadorExcepcion, Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Categorias, Grafico, Menu, Pizarra, Usuario } from '../clases.js';
import { ModeloSPA } from '../modelos.js';
import { VistaSPA } from '../vistas.js';

import { ControladorFrontal } from './ControladorFrontal.js';

class ControladorSPA {
    static ejecutar(instanciaApp) {
        try {
            if (Usuario.estaLogeado()) {
                const $categorias = Categorias.get();
                const $grafico = Grafico.get();
                const $menu = Menu.get();
                const $pizarras = Pizarra.get();

                // CONSUMO por única vez de forma ASÍNCRONA, los JSON de: pizarras, categorías, menú y configuración del gráfico.
                $.when( $pizarras.onReady(), $categorias.onReady(), $menu.onReady(), $grafico.onReady() )
                .always(() => {
                        const $documentoSPA = $(document.body);
                        
                        const datos = new ModeloSPA();
                        ManejadorDOM.renderizar($documentoSPA, new VistaSPA(datos));

                        // El ControladorSPA delega el control al ControladorFrontal
                        ControladorFrontal.ejecutar(instanciaApp);
                }).fail(() => {
                        ManejadorDOM.notificarErrorAlUsuario("Carga inicial")
                });
            } else {
                Navegador.redireccionar("index.html");
            }
        } catch(e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ControladorSPA };