import { Navegador, Video } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Usuario } from '../clases.js';

class ControladorIndex {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            Navegador.redireccionar("pizarra.html");
        } else {
            // CARGANDO DATOS predefinidos en localStorage [Si ya existe NO agrega]
            Usuario.cargarJSON_usuariosPredefinidos();

            // REDUCIENDO velocidad de reproducción del video
            const $videoMarketing = document.querySelector('.video-marketing video');
            if (ManejadorDOM.existeEnDOM($videoMarketing)) {
                Video.cambiarVelocidadDeReproduccion($videoMarketing, 0.5);
            }

            // ASOCIANDO EVENTOS -> A formularios del index.html
            const $formAcceso = document.getElementById('form-acceso');
            if (ManejadorDOM.existeEnDOM($formAcceso)) {
                $formAcceso.addEventListener('submit', ManejadorEventos.validarFormAcceso());
            }

            const $formRegistrarse = document.getElementById('form-registrarse');
            if (ManejadorDOM.existeEnDOM($formRegistrarse)) {
                $formRegistrarse.addEventListener('submit', ManejadorEventos.validarFormRegistrarse());
            }

            // INICIALIZO componentes de Materialize
            M.AutoInit();
        }
    }
}

export { ControladorIndex as controlador };