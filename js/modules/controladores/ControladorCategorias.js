import { Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Categorias, Usuario } from '../clases.js';

import { ControladorApp } from './ControladorApp.js';

class ControladorCategorias {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            ControladorApp.inicializar();
            
            // MOSTRANDO -> Nombre de usuario
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            ManejadorDOM.mostrarNombreDeUsuario(usuarioLogeado);

            //  CREANDO DINÁMICAMENTE -> Cards de categorías
            const $cardsCategorias = $('#contenedor-cards-categorias');
            if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
                const categorias = Categorias.get();
                const cardsCategorias = categorias.crearCards();
                ManejadorDOM.agregar($cardsCategorias, cardsCategorias);
            }
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorCategorias as controlador };