import { App, Navegador, Ruteador } from './modules/igzframework.js';

/* ******************** ARCHIVO PRINCIPAL ******************** */
$(document).ready(function() {
    /* Controlador Frontal */
    const pagina = Navegador.paginaActual;

    if (Ruteador.existe(pagina)) {
        const controlador = Ruteador.getControlador(pagina);
        App.ejecutarControlador(controlador);
    }
    else {
        throw "La página solicitada NO existe en el archivo de rutas";
    }
});