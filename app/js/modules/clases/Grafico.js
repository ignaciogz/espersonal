import { Ajax, AppCache } from '../igzframework.js';
import { ManejadorDOM, Utilidades } from '../servicios.js';
import { JSON_config_grafico } from '../json.js';
import { Categorias } from '../clases.js';
import { VistaEtiqueta } from '../vistas.js';

class Grafico {
    constructor(canvasID) {
        this.canvasGrafico = this.#crearCanvas(canvasID);
    }

    static get() {
        return {
            // Interfaz común de clases, que ejecutarán determinadas instrucciones, cuando finaliza el asincronismo
            onReady: () => Grafico.#cargarJSON_configuracion()
        }
    }

    // Métodos privados
    #crearCanvas(canvasID) {
        const canvas = document.createElement('canvas');
        canvas.id = canvasID;
        
        return canvas;
    }

    #getInformacion() {
        return this.info;
    }

    #setColoresDeFondo() {
        Grafico.config.data.datasets[0].backgroundColor = this.#getInformacion().coloresDeFondo;
    }

    #setDatos() {
        Grafico.config.data.datasets[0].data = this.#getInformacion().porcentajes;
    }

    #setEtiquetas() {
        Grafico.config.data.labels = this.#getInformacion().etiquetas;
    }

    #setInformacionObtenida(informacion) {
        this.info = {
            coloresDeFondo: informacion.coloresDeFondo,
            etiquetas: informacion.etiquetas,
            iconos: informacion.iconos,
            nombres: informacion.nombres,
            porcentajes: informacion.porcentajes
        }
    }

    #setInformacionGenerada(informacion) {
        this.info = {
            coloresDeFondo: Array.from(informacion, categoria => categoria.color),
            etiquetas: Array.from(informacion, categoria => `${categoria.nombre} ${categoria.porcentaje}%`),
            iconos: Array.from(informacion, categoria => categoria.icono),
            nombres: Array.from(informacion, categoria => categoria.nombre),
            porcentajes: Array.from(informacion, categoria => categoria.porcentaje)
        }
    }

    #setPosicionDeLeyendas(posicion = "") {
        Grafico.config.options.plugins.legend.position = posicion;
    }

    #setTooltip() {
        Grafico.config.options.plugins.tooltip.callbacks.label = Grafico.fn_tooltip();
    }

    static #cargarJSON_configuracion() {
        return  Ajax.getJQXHR(JSON_config_grafico)
                    .done(Grafico.fn_cargarConfiguracion())
                    .fail(() => console.warn("Falló la carga de la configuración del gráfico"));
    }

    // Métodos públicos
    cargarDatosCacheados() {
        const informacionDeCache = AppCache.obtener("grafico_informacion");
        this.#setInformacionObtenida(informacionDeCache);
    }

    cargarInformacion(pizarra, categorias) {
        if (AppCache.existe("grafico_informacion")) {
            // La información fue generada previamente. Entonces la tomo de la cache
            this.cargarDatosCacheados();
        } else {
            // La información NO fue generada previamente o se modificó. Entonces la genero
            this.generarInformacion(pizarra, categorias);
            AppCache.guardar("grafico_informacion", this.#getInformacion());
        }
    }

    crearInformacionAsociada() {
        const fragmento = ManejadorDOM.crearFragmento();

        const coloresDeFondo = this.#getInformacion().coloresDeFondo;
        const iconos = this.#getInformacion().iconos;
        const nombres = this.#getInformacion().nombres;
        const porcentajes = this.#getInformacion().porcentajes;

        for (let i = 0; i < nombres.length; i++) {
            let $etiqueta = VistaEtiqueta.crear(coloresDeFondo[i], nombres[i], Utilidades.formatearPorcentaje(porcentajes[i]), iconos[i]);
            ManejadorDOM.agregar(fragmento, $etiqueta);   
        }

        return fragmento;
    }

    generarInformacion(pizarra, categorias) {
        let informacion = categorias.map(Grafico.fn_generarInfoDeCategoria(pizarra));
        informacion = informacion.filter(Grafico.fn_infoRelevante());
        
        this.#setInformacionGenerada(informacion);    
    }

    graficarInformacion() {
        this.#setPosicionDeLeyendas("right");

        this.#setTooltip();
        this.#setColoresDeFondo();
        this.#setDatos();
        this.#setEtiquetas();
        
        new Chart(this.canvasGrafico, Grafico.config);
        
        return this.canvasGrafico;
    }
    
    static fn_cargarConfiguracion() {
        return function(data) {
            Grafico.config = data;
        }
    }

    static fn_generarInfoDeCategoria(pizarra) {
        return categoria => {
            const porcentajeDeCategoria = pizarra.calcularPorcentajeDeCategoria(categoria.getNombre());

            return {
                color: categoria.getColor(),
                icono: categoria.getIcono(),
                nombre: categoria.getNombre(),
                porcentaje: porcentajeDeCategoria
            }
        }
    }

    static fn_infoRelevante() {
        return elemento => elemento.porcentaje > 0;
    }

    static fn_tooltip() {
        return function(context) {
            let label = context.label.split(" ");
            label.pop();
            label = label.join(" ");
            
            return `${label} ${Utilidades.formatearPorcentaje(context.parsed)}% de los egresos`;
        }
    }
}

export { Grafico };