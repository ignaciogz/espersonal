import { SPA } from './modules/igzframework.js';
import { ModeloSPA } from './modules/modelos.js';

/* ******************** ARCHIVO PRINCIPAL - SPA ******************** */
$(document).ready(function() {
    const esPersonalApp = SPA.inicializar();

    // Consumo por única vez de forma ASÍNCRONA, el JSON de: configuración de la app.
    esPersonalApp.onReady().always(() => {
        new ModeloSPA(esPersonalApp);
    });
});

$(window).on('hashchange', function() {
    SPA.actualizar();
});