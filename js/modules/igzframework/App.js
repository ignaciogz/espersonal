import { Ajax, Ruteador } from '../igzframework.js';
import { JSON_config } from '../json.js';

class App {
    constructor() {
        const _this = this;
        this.onReady = Ajax.getJQXHR(JSON_config)
                           .done(App.fn_cargarConfiguracion().bind(_this));
    }

    static inicializar() {
        if (App.instancia instanceof App) {
            return App.instancia;
        }

        return App.instancia = new App();
    }

    ejecutarControlador(controlador) {
        import(`../controladores/${controlador}.js`)
        .then(module => module.controlador.ejecutar());
    }
    
    existe(pagina) {
        return Ruteador.existe(pagina);
    }

    getControlador(pagina) {
        return Ruteador.getControlador(pagina)
    }

    static inicializarDependencia(nombreDeDependencia) {
        import(`../dependencias/${nombreDeDependencia}.js`)
        .then(module => module.dependencia.inicializar());
    }

    static modoDesarrollo() {
        return App.config["modo"] === "desarrollo";
    }

    static fn_cargarConfiguracion() {
        return function(data) {
            App.config = data;
        }
    }
}

export { App };