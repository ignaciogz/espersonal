import { App, Video } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos, Modal } from '../servicios.js';
import { Usuario } from '../clases.js';

class ModeloIndex {
    constructor() {
        // CARGANDO DATOS predefinidos de forma ASÍNCRONA -> En localStorage [Si ya existe NO agrega]
        Usuario.cargarJSON_usuariosPredefinidos();

        // REDUCIENDO velocidad de reproducción del video
        const $videoMarketing = $('.video-marketing video'); 
        if (ManejadorDOM.existeEnDOM($videoMarketing)) {
            Video.cambiarVelocidadDeReproduccion($videoMarketing, 0.5);
        }

        // CREANDO DINÁMICAMENTE -> Modal con el formulario de registro
        const $modalRegistrarse = Modal.crearConFormulario('Registrarse', 'app_registration', 'Registrarme');
        ManejadorDOM.agregar(document.body, $modalRegistrarse);

        // ASOCIANDO EVENTOS
        ManejadorEventos.asociar('#form-acceso', 'submit', ManejadorEventos.getHandler("formAcceso"));
        ManejadorEventos.asociar('#form-registrarse', 'submit', ManejadorEventos.getHandler("formRegistrarse"));

        // INICIALIZANDO COMPONENTES DE TERCEROS
        App.inicializarDependencia('Materialize');
    }
}

export { ModeloIndex };