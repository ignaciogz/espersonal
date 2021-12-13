import { Formulario, Modal, Usuario } from '../clases.js';

class ModeloIndex {
    constructor() {
        // CARGANDO DATOS predefinidos de forma ASÍNCRONA -> En localStorage [Si ya existe NO agrega]
        Usuario.cargarJSON_usuariosPredefinidos();

        // CREANDO DINÁMICAMENTE -> Formulario de acceso
        const $formAcceso = Formulario.crearFormAcceso('Acceso', 'ingresar', 'registrarse');
        
        // CREANDO DINÁMICAMENTE -> Modal con el formularios de registrarse
        const $modalRegistrarse = Modal.crearConFormulario('Registrarse', 'app_registration', 'registrarme');

        return {
            tituloDelDocumento: 'ESTO ESPERSONAL ! - Finanzas personales más grosas',
            formularios: {
                acceso: $formAcceso
            },
            modales: {
                registrarse: $modalRegistrarse
            },
            videos: {
                login: {
                    nombre: "esto-espersonal",
                    attr: {
                        autoplay: true,
                        loop: true,
                        muted: true,
                        title: "Video de hombre gritando eufóricamente: ESTO ESPERSONAL !"
                    }
                }
            }
        };
    }
}

export { ModeloIndex };