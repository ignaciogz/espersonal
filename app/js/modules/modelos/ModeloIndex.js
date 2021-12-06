import { App, Video, ManejadorExcepcion } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Usuario } from '../clases.js';

class ModeloIndex {
    constructor() {
        try {
            ManejadorDOM.tituloDePagina('ESTO ESPERSONAL ! - Finanzas personales más grosas');

            // CARGANDO DATOS predefinidos de forma ASÍNCRONA -> En localStorage [Si ya existe NO agrega]
            Usuario.cargarJSON_usuariosPredefinidos();

            // REDUCIENDO velocidad de reproducción del video
            const $videoMarketing = $('.video-marketing video'); 
            if (ManejadorDOM.existeEnDOM($videoMarketing)) {
                Video.cambiarVelocidadDeReproduccion($videoMarketing, 0.5);
            }

            // ASOCIANDO EVENTOS
            ManejadorEventos.asociar('#form-acceso', 'submit', ManejadorEventos.getHandler("formAcceso"));
            ManejadorEventos.asociar('#form-registrarse', 'submit', ManejadorEventos.getHandler("formRegistrarse"));

            // INICIALIZANDO COMPONENTES DE TERCEROS
            App.inicializarDependencia('Materialize');
        } catch(e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ModeloIndex };