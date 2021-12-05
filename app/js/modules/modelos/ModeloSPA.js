import { App, ManejadorExcepcion } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Formulario, Menu, Modal, Usuario } from '../clases.js';

class ModeloSPA {
    constructor() {
        try {
            // CREANDO DINÁMICAMENTE y de forma ASÍNCRONA -> Opciones del menú de navegación
            const $menu = $('#contenedor-menu');
            if (ManejadorDOM.existeEnDOM($menu)) {
                const menu = Menu.get();

                menu.onReady().always(() => {
                        const itemsDelMenu = menu.crearItems();
                        ManejadorDOM.agregar($menu, itemsDelMenu);
                });
            }

            // CREANDO DINÁMICAMENTE -> Modal con el formulario de configuración
            const $modalConfiguracion = Modal.crearConFormulario('Configuración', 'settings', 'Guardar');
            ManejadorDOM.agregar(document.body, $modalConfiguracion);

            // MOSTRANDO -> Nombre de usuario
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            ManejadorDOM.mostrarNombreDeUsuario(usuarioLogeado);

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
            ManejadorEventos.asociar('#form-configuracion', 'submit', ManejadorEventos.getHandler("formConfiguracion"));
            
            ManejadorEventos.asociar('#btn-configuracion', 'click', ManejadorEventos.getHandler("autocompletarFormConfiguracion"));
            ManejadorEventos.asociar('#btn-salir', 'click', ManejadorEventos.getHandler("cerrarApp"));

            // INICIALIZANDO COMPONENTES DE TERCEROS
            App.inicializarDependencia('Materialize');
        } catch(e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ModeloSPA };