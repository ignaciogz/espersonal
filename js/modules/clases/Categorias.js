import { ManejadorDOM } from '../servicios.js';
import { JSON_categoriasPredefinidas } from '../json.js';
import { Categoria } from '../clases.js';

class Categorias {
    constructor() {
        this.listado = [];
        this.cargarJSON_categoriasPredefinidas();
    }

    static get() {
        if (Categorias.instancia instanceof Categorias) {
            return Categorias.instancia;
        }

        return Categorias.instancia = new Categorias();
    }

    // Métodos privados
    setCategoria(valor) {
        this.listado.push(valor);
    }

    cargarJSON_categoriasPredefinidas() {
        const categoriasPredefinidas = JSON.parse(JSON_categoriasPredefinidas);

        for (const categoria of categoriasPredefinidas) {
            const nuevaCategoria = new Categoria(categoria.nombre, categoria.descripcion, categoria.icono);
            this.setCategoria(nuevaCategoria);
        }
    }

    // Métodos públicos
    getListado() {
        return this.listado;
    }

    crearCards() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const categoria of this.getListado()) {
            let cardCategoria = Categoria.crearCard(categoria.nombre, categoria.descripcion, categoria.icono);
            ManejadorDOM.agregar(fragmento, cardCategoria);
        }

        return fragmento;
    }
}

export { Categorias };