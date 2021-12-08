import { Formulario, Menu, Modal, Usuario } from '../clases.js';

class ModeloSPA {
    constructor() {
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        const menu = Menu.get();

        // CREANDO DINÁMICAMENTE -> Modal con el formulario de configuración
        const $modalConfiguracion = Modal.crearConFormulario('Configuración', 'settings', 'Guardar');

        // CREANDO DINÁMICAMENTE -> Opciones del select año, del formulario de configuración
        const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);

        // CREANDO DINÁMICAMENTE -> Opciones del select fecha, del formulario de configuración
        const opcionesSelectMes = Formulario.crearOpcionesSelectMes();

        return {
            usuario: {
                nombre: usuarioLogeado.nombre
            },
            menu: {
                items: menu.crearItems()
            },
            selects: {
                anio: { opciones: opcionesSelectAnio },
                fecha: { opciones: opcionesSelectMes }
            },
            modales: {
                configuracion: $modalConfiguracion
            }
        }
    }
}

export { ModeloSPA };