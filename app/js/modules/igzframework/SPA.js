import { App } from '../igzframework.js';

import { ControladorFrontal } from '../controladores/ControladorFrontal.js';

class SPA extends App {
    static actualizar() {
        const instanciaSPA = SPA.inicializar();
        ControladorFrontal.ejecutar(instanciaSPA);
    }

    static inicializar() {
        if (SPA.instancia instanceof SPA) {
            return SPA.instancia;
        }

        return SPA.instancia = new SPA();
    }

    // Métodos privados
    static #parsearPagina(url) {
        let paginaActual = url.hash.slice(1).toLowerCase() || '/';
        return paginaActual;
    }

    // Métodos públicos
    existe(pagina) {
        pagina = SPA.#parsearPagina(pagina);
        return super.existe(pagina);
    }

    getControlador(pagina) {
        pagina = SPA.#parsearPagina(pagina);
        return super.getControlador(pagina);
    }
}

export { SPA };