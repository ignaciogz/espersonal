import { JSON_rutas } from '../json.js';

class Ruteador {
    static rutas = JSON.parse(JSON_rutas).pop();

    static existe(pagina) {
        return Ruteador.rutas.hasOwnProperty(pagina);
    }

    static getControlador(pagina) {
        return Ruteador.rutas[pagina];
    }
}

export { Ruteador };