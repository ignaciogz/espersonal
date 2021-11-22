import { Ajax } from '../igzframework.js';
import { JSON_config_grafico } from '../json.js';

class Grafico {
    constructor(canvasGrafico) {
        this.canvasGrafico = canvasGrafico;

        const _this = this;
        this.onReady = Ajax.getJQXHR(JSON_config_grafico)
                           .done(Grafico.fn_cargarConfiguracion().bind(_this));
    }

    static get(canvasGrafico) {
        if (Grafico.instancia instanceof Grafico) {
            return Grafico.instancia;
        }

        return Grafico.instancia = new Grafico(canvasGrafico);
    }

    #setColoresDeFondo() {
        Grafico.config.data.datasets[0].backgroundColor = this.coloresDeFondo;
    }

    #setDatos() {
        Grafico.config.data.datasets[0].data = this.datos;
    }

    #setEtiquetas() {
        Grafico.config.data.labels = this.etiquetas;
    }

    #setPosicionDeLeyendas(posicion = "") {
        Grafico.config.options.plugins.legend.position = posicion;
    }

    // Métodos públicos
    generarInformacion(pizarra, categorias) {
        let info = categorias.map(Grafico.fn_generarInfoDeCategoria(pizarra));
        info = info.filter(Grafico.fn_infoRelevante());
        
        // Guardo la informacion relevante en la instancia
        this.coloresDeFondo = Array.from(info, categoria => categoria.color);
        this.datos = Array.from(info, categoria => categoria.porcentaje);
        this.etiquetas = Array.from(info, categoria => categoria.nombre);
    }

    graficar() {
        this.#setPosicionDeLeyendas("right");

        this.#setColoresDeFondo();
        this.#setDatos();
        this.#setEtiquetas();

        return new Chart(this.canvasGrafico, Grafico.config);
    }
    
    static fn_cargarConfiguracion() {
        return function(data) {
            Grafico.config = data;
        }
    }

    static fn_infoRelevante() {
        return elemento => elemento.porcentaje > 0;
    }

    static fn_generarInfoDeCategoria(pizarra) {
        return categoria => {
            const porcentajeDeCategoria = pizarra.calcularPorcentajeDeCategoria(categoria.nombre);

            return {
                nombre: categoria.nombre,
                color: categoria.color,
                porcentaje: porcentajeDeCategoria
            }
        }
    }
}

export { Grafico };