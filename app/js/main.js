import { SPA, Navegador } from '/js//modules/igzframework.js';
import { Excepcion_noExisteRuta } from '/js/modules/igzframework.js';

import { ControladorSPA } from '/js/modules/controladores/ControladorSPA.js';

/* ******************** ARCHIVO PRINCIPAL - SPA ******************** */
$(document).ready(function() {
    ControladorSPA.inicializar();
    
    const esPersonalApp = SPA.inicializar();

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

$(window).on('hashchange', function() {
    const esPersonalApp = SPA.inicializar();

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
