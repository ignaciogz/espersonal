import { Ajax } from '../igzframework.js';
import { JSON_configGrafico } from '../json.js';

class Grafico {
    constructor(canvasGrafico) {
        this.canvasGrafico = canvasGrafico;

        const _this = this;
        this.onReady = Ajax.getJQXHR(JSON_configGrafico)
                           .done(Grafico.fn_cargarConfiguracion().bind(_this));
    }

    static get(canvasGrafico) {
        if (Grafico.instancia instanceof Grafico) {
            return Grafico.instancia;
        }

        return Grafico.instancia = new Grafico(canvasGrafico);
    }

    // Métodos privados
    #setColoresDeFondo(coloresDeFondo = []) {
        Grafico.config.data.datasets.backgroundColor = coloresDeFondo;
    }

    #setDatos(datos = []) {
        Grafico.config.data.datasets.data = datos;
    }

    #setEtiquetas(etiquetas = []) {
        Grafico.config.data.labels = etiquetas;
    }

    #setPosicionDeLeyendas(posicion = "") {
        Grafico.config.options.plugins.legend.position = posicion;
    }

    // Métodos públicos
    mostrar() {
        this.#setPosicionDeLeyendas("right");
        return new Chart(this.canvasGrafico, Grafico.config);
    }
    
    static fn_cargarConfiguracion() {
        return function(data) {
            Grafico.config = data;
        }
    }
}

export { Grafico };