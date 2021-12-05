import { App } from '../igzframework.js';
import { Excepcion_noExisteRuta } from '../igzframework.js';

class Ruteador {
    static existe(pagina) {
        const existeRuta = App.config["rutas"].hasOwnProperty(pagina);
        
        if(!existeRuta) {
            new Excepcion_noExisteRuta(pagina);
        }
        
        return existeRuta;
    }

    static getControlador(pagina) {
        return App.config["rutas"][pagina];
    }
}

export { Ruteador };