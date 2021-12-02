import { MPA } from './modules/igzframework.js';

import { ControladorFrontal } from '/js/modules/controladores/ControladorFrontal.js';

/* ******************** ARCHIVO PRINCIPAL - MPA ******************** */
$(document).ready(function() {
    const esPersonalApp = MPA.inicializar();

    // Consumo por única vez de forma ASÍNCRONA, el JSON de: configuración de la app.
    esPersonalApp.onReady().always(() => {
        /* Controlador Frontal */
        ControladorFrontal.ejecutar(esPersonalApp);
    });
});