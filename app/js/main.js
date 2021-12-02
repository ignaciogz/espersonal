import { ModeloSPA } from './modules/modelos/ModeloSPA.js';
import { SPA } from './modules/igzframework.js';
import { Categorias, Pizarra } from './modules/clases.js';

import { ControladorFrontal } from './modules/controladores/ControladorFrontal.js';

/* ******************** ARCHIVO PRINCIPAL - SPA ******************** */
$(document).ready(function() {
    const esPersonalApp = SPA.inicializar();

    // Consumo por única vez de forma ASÍNCRONA, el JSON de: configuración de la app.
    esPersonalApp.onReady().always(() => {
        new ModeloSPA();

        // Consumo por única vez de forma ASÍNCRONA, los JSON de: pizarras y categorías.
        const pizarras = Pizarra.get();
        const categorias = Categorias.get();

        $.when( pizarras.onReady(), categorias.onReady() ).always(() => {
            ControladorFrontal.ejecutar(esPersonalApp);
        });
    });
});

$(window).on('hashchange', function() {
    SPA.actualizar();
});