import { App } from '../igzframework.js';

class SPA extends App {
    static inicializar() {
        if (SPA.instancia instanceof SPA) {
            return SPA.instancia;
        }

        return SPA.instancia = new SPA();
    }

    // Métodos privados
    static parseLocation(url) {
        const paginaActual = url.hash.slice(1).toLowerCase() || '/';
        return paginaActual;
    }

    // Métodos públicos
    existe(pagina) {
        pagina = SPA.parseLocation(pagina);
        return super.existe(pagina);
    }

    getControlador(pagina) {
        pagina = SPA.parseLocation(pagina);
        return super.getControlador(pagina);
    }
}

export { SPA };