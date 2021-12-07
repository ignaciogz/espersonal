import { Ajax } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { JSON_categorias } from '../json.js';
import { Categoria } from '../clases.js';
import { VistaCategoria } from '../vistas.js';

class Categorias {
    constructor() {
        this.listado = new Array();
    }

    static get() {
        if (Categorias.instancia instanceof Categorias) {
            return Categorias.instancia;
        }

        return Categorias.instancia = new Categorias();
    }

    // Interfaz común de clases, que ejecutarán determinadas instrucciones, cuando finaliza el asincronismo
    onReady() {
        return this.#cargarJSON_categoriasPredefinidas();
    }

    // Métodos privados
    setCategoria(valor) {
        this.listado.push(valor);
    }

    #cargarJSON_categoriasPredefinidas() {
        const _this = this;

        return Ajax.getJQXHR(JSON_categorias)
                   .done(Categorias.fn_cargarCategoriasPredefinidas().bind(_this))
                   .fail(() => console.warn("Falló la carga de las categorías predefinidas"));
    }

    // Métodos públicos
    getListado() {
        return this.listado;
    }

    crearCards() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const categoria of this.getListado()) {
            let cardCategoria = VistaCategoria.crearCard(categoria);
            ManejadorDOM.agregar(fragmento, cardCategoria);
        }

        return fragmento;
    }

    static fn_cargarCategoriasPredefinidas() {
        return function(data) {
            for (const categoria of data) {
                const nuevaCategoria = new Categoria(categoria.nombre, categoria.descripcion, categoria.icono, categoria.color);
                this.setCategoria(nuevaCategoria);
            }
        }
    }
}

export { Categorias };