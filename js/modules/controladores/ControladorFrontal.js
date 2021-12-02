import { Navegador } from '../igzframework.js';
import { Excepcion_noExisteRuta } from '../igzframework.js';

class ControladorFrontal {
    static ejecutar(instanciaApp) {
        // Controlador Frontal
        const pagina = Navegador.paginaActual();
            
        if (instanciaApp.existe(pagina)) {
            const controlador = instanciaApp.getControlador(pagina);
            instanciaApp.ejecutarControlador(controlador);
        }
        else {
            new Excepcion_noExisteRuta(pagina);
        }
    }
}

export { ControladorFrontal };