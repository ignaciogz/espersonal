import { App, Navegador, Video } from '../igzframework.js';
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
            const $videoMarketing = $('.video-marketing video'); 
            if (ManejadorDOM.existeEnDOM($videoMarketing)) {
                Video.cambiarVelocidadDeReproduccion($videoMarketing, 0.5);
            }

            // ASOCIANDO EVENTOS
            ManejadorEventos.asociar('#form-acceso', 'submit', ManejadorEventos.getValidarFormAcceso());
            ManejadorEventos.asociar('#form-registrarse', 'submit', ManejadorEventos.getValidarFormRegistrarse());

            // INICIALIZANDO COMPONENTES DE TERCEROS
            App.inicializarDependencia('Materialize');
        }
    }
}

export { ControladorIndex as controlador };