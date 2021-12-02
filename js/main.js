import { MPA, Navegador } from './modules/igzframework.js';
import { Excepcion_noExisteRuta } from './modules/igzframework.js';

/* ******************** ARCHIVO PRINCIPAL - MPA ******************** */
$(document).ready(function() {
    const esPersonalApp = MPA.inicializar();

    esPersonalApp.onReady().always(() => {
        /* Controlador Frontal */
        const pagina = Navegador.paginaActual();

        if (esPersonalApp.existe(pagina)) {
            const controlador = esPersonalApp.getControlador(pagina);
            esPersonalApp.ejecutarControlador(controlador);
        }
        else {
            new Excepcion_noExisteRuta(pagina);
        }
    });
});