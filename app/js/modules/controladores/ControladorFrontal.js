import { ManejadorExcepcion, Navegador } from '../igzframework.js';

class ControladorFrontal {
    static ejecutar(instanciaApp) {
        try {
            // Controlador Frontal
            const pagina = Navegador.paginaActual();
                
            if (instanciaApp.existe(pagina)) {
                const controlador = instanciaApp.getControlador(pagina);
                instanciaApp.ejecutarControlador(controlador);
            }
        } catch(e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ControladorFrontal };