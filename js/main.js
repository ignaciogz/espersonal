import { App, Navegador } from './modules/igzframework.js';
import { Excepcion_noExisteRuta } from './modules/igzframework.js';

/* ******************** ARCHIVO PRINCIPAL ******************** */
$(document).ready(function() {
    const esPersonalApp = App.inicializar();

    esPersonalApp.onReady.always(() => {
        /* Controlador Frontal */
        const pagina = Navegador.paginaActual;

        if (esPersonalApp.existe(pagina)) {
            const controlador = esPersonalApp.getControlador(pagina);
            esPersonalApp.ejecutarControlador(controlador);
        }
        else {
            new Excepcion_noExisteRuta(pagina);
        }
    });
});