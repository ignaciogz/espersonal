import { ManejadorExcepcion, Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Usuario } from '../clases.js';
import { VistaIndex } from '../vistas.js';
import { ModeloIndex } from '../modelos.js';

class ControladorIndex {
    static ejecutar() {
        try {
            if (Usuario.estaLogeado()) {
                Navegador.redireccionar("app/index.html");
            } else {
                const $contenedor = $('#contenedor-mpa');
                
                if(ManejadorDOM.existeEnDOM($contenedor)) {
                    const datos = new ModeloIndex();
                    ManejadorDOM.renderizar($contenedor, new VistaIndex(datos));
                } else {
                    ManejadorDOM.notificarErrorAlUsuario("Sin contenedor");
                }
            }
        } catch (e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ControladorIndex as controlador };