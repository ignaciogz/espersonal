import { App } from '../igzframework.js';

class MPA extends App {
    static inicializar() {
        if (MPA.instancia instanceof MPA) {
            return MPA.instancia;
        }

        return MPA.instancia = new MPA();
    }

    // Métodos privados
    static parseLocation(url) {
        let paginaActual;
        paginaActual = url.pathname.substring(1); // Elimino la barra inicial
        paginaActual = paginaActual.split(".").shift(); // Elimino la extension

        return paginaActual;
    }

    // Métodos públicos
    existe(pagina) {
        pagina = MPA.parseLocation(pagina);
        return super.existe(pagina);
    }

    getControlador(pagina) {
        pagina = MPA.parseLocation(pagina);
        return super.getControlador(pagina);
    }
}

export { MPA };