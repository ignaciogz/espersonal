import { App, ManejadorExcepcion } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Categorias, Formulario, Menu, Modal, Pizarra, Usuario } from '../clases.js';

class ModeloSPA {
    constructor() {
        try {
            this.setupInicial();

            return {
                pizarras: Pizarra.get(),
                categorias: Categorias.get()
            }
        } catch(e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }

    setupInicial() {
        const $documentoSPA = $(document.body);

        // CREANDO DINÁMICAMENTE y de forma ASÍNCRONA -> Opciones del menú de navegación
        const $menu = $documentoSPA.find('#contenedor-menu');
        if (ManejadorDOM.existeEnDOM($menu)) {
            const menu = Menu.get();

            menu.onReady().always(() => {
                    const itemsDelMenu = menu.crearItems();
                    ManejadorDOM.agregar($menu, itemsDelMenu);
            });
        }

        // CREANDO DINÁMICAMENTE -> Modal con el formulario de configuración
        const $modalConfiguracion = Modal.crearConFormulario('Configuración', 'settings', 'Guardar');
        ManejadorDOM.agregar($documentoSPA, $modalConfiguracion);

        // MOSTRANDO -> Nombre de usuario
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        ManejadorDOM.mostrarNombreDeUsuario(usuarioLogeado);

        // CREANDO DINÁMICAMENTE -> Opciones del select año, del formulario de configuración
        const $selectAnio = $documentoSPA.find('#configuracion-select-anio');
        if (ManejadorDOM.existeEnDOM($selectAnio)) {
            const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);
            ManejadorDOM.agregar($selectAnio, opcionesSelectAnio);
        }

        // CREANDO DINÁMICAMENTE -> Opciones del select fecha, del formulario de configuración
        const $selectMes = $documentoSPA.find('#configuracion-select-mes');
        if (ManejadorDOM.existeEnDOM($selectMes)) {
            const opcionesSelectMes = Formulario.crearOpcionesSelectMes();
            ManejadorDOM.agregar($selectMes, opcionesSelectMes);
        }

        // ASOCIANDO EVENTOS
        ManejadorEventos.asociar('#form-configuracion', 'submit', ManejadorEventos.getHandler("formConfiguracion"));
        
        ManejadorEventos.asociar('#btn-configuracion', 'click', ManejadorEventos.getHandler("autocompletarFormConfiguracion"));
        ManejadorEventos.asociar('#btn-salir', 'click', ManejadorEventos.getHandler("cerrarApp"));

        ManejadorEventos.asociar(window, 'hashchange', ManejadorEventos.getHandler("actualizarSPA"));

        // INICIALIZANDO COMPONENTES DE TERCEROS
        App.inicializarDependencia('Materialize');
    }
}

export { ModeloSPA };