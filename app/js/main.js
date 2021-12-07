import { SPA } from './modules/igzframework.js';

import { ControladorSPA } from './modules/controladores/ControladorSPA.js';

/* ******************** ARCHIVO PRINCIPAL - SPA ******************** */
$(document).ready(function() {
    const esPersonalApp = SPA.inicializar();

    // Consumo por única vez de forma ASÍNCRONA, el JSON de: configuración de la app.
    esPersonalApp.onReady().always(() => {
        ControladorSPA.ejecutar(esPersonalApp);
    });
});