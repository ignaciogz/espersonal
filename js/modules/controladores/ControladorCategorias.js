import { Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Categorias, Usuario } from '../modelos.js';

import { ControladorApp } from './ControladorApp.js';

class ControladorCategorias {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            ControladorApp.inicializar();
            
            //  CREANDO DINÁMICAMENTE  y de forma ASÍNCRONA -> Cards de categorías
            const $cardsCategorias = $('#contenedor-cards-categorias');
            if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
                const categorias = Categorias.get();

                categorias.onReady().always(() => {
                        const cardsCategorias = categorias.crearCards();
                        ManejadorDOM.agregar($cardsCategorias, cardsCategorias);
                });
            }
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorCategorias as controlador };