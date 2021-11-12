import { App, Navegador } from '../igzframework.js';
import { Formulario, ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Categorias, Menu, Pizarra, Usuario } from '../clases.js';

class ControladorCategorias {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            // CREANDO DINÁMICAMENTE -> Opciones del menú de navegación
            const $menu = $('#contenedor-menu');
            if (ManejadorDOM.existeEnDOM($menu)) {
                const menu = Menu.get();
                const itemsDelMenu = menu.crearItems();
                ManejadorDOM.agregar($menu, itemsDelMenu);
            }

            // CARGANDO DATOS predefinidos en localStorage [Si ya existe NO agrega]
            Pizarra.cargarJSON_pizarrasPredefinidas();

            /* ------------ INICIO Lógica del controlador ------------ */
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
            /* ------------ FIN Lógica del controlador ------------ */

            // CREANDO DINÁMICAMENTE -> Opciones del select año, del formulario de configuración
            const $selectAnio = $('#configuracion-select-anio');
            if (ManejadorDOM.existeEnDOM($selectAnio)) {
                const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);
                ManejadorDOM.agregar($selectAnio, opcionesSelectAnio);
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select fecha, del formulario de configuración
            const $selectMes = $('#configuracion-select-mes');
            if (ManejadorDOM.existeEnDOM($selectMes)) {
                const opcionesSelectMes = Formulario.crearOpcionesSelectMes();
                ManejadorDOM.agregar($selectMes, opcionesSelectMes);
            }

            // ASOCIANDO EVENTOS
            ManejadorEventos.asociar('#btn-salir', 'click', ManejadorEventos.getHandler_cerrarApp());

            // INICIALIZANDO COMPONENTES DE TERCEROS
            App.inicializarDependencia('Materialize');
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorCategorias as controlador };