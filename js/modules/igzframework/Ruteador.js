import { App } from '../igzframework.js';

class Ruteador {
    static existe(pagina) {
        return App.config["rutas"].hasOwnProperty(pagina);
    }

    static getControlador(pagina) {
        return App.config["rutas"][pagina];
    }
}

export { Ruteador };