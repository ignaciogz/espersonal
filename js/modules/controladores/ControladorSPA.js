import { App } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Formulario, Menu, Usuario } from '../clases.js';

class ControladorSPA {
    static inicializar() {
        // CREANDO DINÁMICAMENTE y de forma ASÍNCRONA -> Opciones del menú de navegación
        const $menu = $('#contenedor-menu');
        if (ManejadorDOM.existeEnDOM($menu)) {
            const menu = Menu.get();

            menu.onReady().always(() => {
                    const itemsDelMenu = menu.crearItems();
                    ManejadorDOM.agregar($menu, itemsDelMenu);
            });
        }

        // MOSTRANDO -> Nombre de usuario
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        ManejadorDOM.mostrarNombreDeUsuario(usuarioLogeado);

        // CREANDO DINÁMICAMENTE -> Opciones del select año, del formulario de configuración
        const $selectAnio = $('#configuracion-select-anio');
        if (ManejadorDOM.existeEnDOM($selectAnio)) {
            const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);
            ManejadorDOM.renderizar($selectAnio, opcionesSelectAnio);
        }

        // CREANDO DINÁMICAMENTE -> Opciones del select fecha, del formulario de configuración
        const $selectMes = $('#configuracion-select-mes');
        if (ManejadorDOM.existeEnDOM($selectMes)) {
            const opcionesSelectMes = Formulario.crearOpcionesSelectMes();
            ManejadorDOM.renderizar($selectMes, opcionesSelectMes);
        }

        // ASOCIANDO EVENTOS
        ManejadorEventos.asociar('#form-configuracion', 'submit', ManejadorEventos.getHandler_formConfiguracion());
        
        ManejadorEventos.asociar('#btn-configuracion', 'click', ManejadorEventos.getHandler_autocompletarFormConfiguracion());
        ManejadorEventos.asociar('#btn-salir', 'click', ManejadorEventos.getHandler_cerrarApp());

        // INICIALIZANDO COMPONENTES DE TERCEROS
        App.inicializarDependencia('Materialize');
    }
}

export { ControladorSPA };