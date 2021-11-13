import { Almacenamiento } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { JSON_pizarrasPredefinidas } from '../json.js';
import { Item } from '../clases.js';

class Pizarra {
    constructor(usuario) {
        this.usuario = usuario.nombre;
        this.fecha = usuario.fechaSeleccionada;
        this.items = [];
        this.totalIngresos = null;
        this.totalEgresos = null;
        this.ultimoItemID = 0;
    }

    // Métodos privados
    #generarNuevoItemID() {
        this.ultimoItemID = this.ultimoItemID + 1;
        return this.ultimoItemID;
    }

    static #eliminarPizarras() {
        Almacenamiento.eliminar("pizarras");
    }

    static #obtenerPizarras() {
        return Almacenamiento.obtener("pizarras");
    }

    // Métodos privados [Encargados de generar la información útil]
    #filtrarItems(propiedad, valor) {
        return this.items.filter(elemento => elemento[propiedad] === valor);
    }

    #obtenerItemsDeCategoria(categoriaDeItem) {
        return this.#filtrarItems("categoria", categoriaDeItem);
    }

    #obtenerItemsDeTipo(tipoDeItem) {
        return this.#filtrarItems("tipo", tipoDeItem);
    }

    #calcularTotal(coleccion) {
        return coleccion.reduce((a, b) => a + b.monto, 0);
    }

    #calcularTotalIngresos() {
        this.totalIngresos = this.#calcularTotal(this.#obtenerItemsDeTipo("Ingreso"));
    }

    #calcularTotalEgresos() {
        this.totalEgresos = this.#calcularTotal(this.#obtenerItemsDeTipo("Egreso"));
    }

    // Métodos públicos
    agregarItem(item) {
        this.items.push(item);
    }

    calcularBalance() {
        return this.totalIngresos - this.totalEgresos;
    }

    eliminarItem(indiceItem) {
        this.items.splice(indiceItem, 1);
    }

    getCantidadDeItems() {
        return this.getItems().length;
    }

    getItems() {
        return this.items;
    }

    getNuevoItemID() {
        const nuevoItemID = this.#generarNuevoItemID();
        return nuevoItemID;
    }

    getTotalEgresos() {
        return this.totalEgresos;
    }

    setItems(items) {
        this.items = items;
    }

    setUltimoItemID(ultimoItemID) {
        this.ultimoItemID = ultimoItemID;
    }

    getTotalIngresos() {
        return this.totalIngresos;
    }

    static buscarPizarra(usuario, fecha) {
        if (Almacenamiento.existe("pizarras")) {
            function pizarraDeUsuarioBuscada(elemento) {
                return elemento.usuario === usuario && elemento.fecha === fecha;
            }

            return Almacenamiento.buscar("pizarras", pizarraDeUsuarioBuscada);
        } else {
            return undefined;
        }
    }

    static cargarJSON_pizarrasPredefinidas() {
        const pizarrasPredefinidas = JSON.parse(JSON_pizarrasPredefinidas);

        for (const pizarra of pizarrasPredefinidas) {
            if (!Pizarra.existePizarra(pizarra)) {
                Pizarra.guardarPizarra(pizarra);
            }
        }
    }

    static getIndice(pizarra, pizarras) {
        function pizarraDeUsuarioBuscada(elemento) {
            return elemento.usuario === pizarra.usuario && elemento.fecha === pizarra.fecha;
        }

        return pizarras.findIndex(pizarraDeUsuarioBuscada);
    }

    static existenteAgregarItem(pizarra, item) {
        let pizarrasAlmacenadas = Pizarra.#obtenerPizarras();
        const indicePizarraDesactualizada = Pizarra.getIndice(pizarra, pizarrasAlmacenadas);
        Pizarra.#eliminarPizarras();

        pizarra.agregarItem(item);

        pizarra.actualizarInformacion();

        // Reemplazo la pizarra desactualizada por la actualizada, dentro del conjunto de todas las pizarras
        pizarrasAlmacenadas.splice(indicePizarraDesactualizada, 1, pizarra);

        for (const pizarra of pizarrasAlmacenadas) {
            Pizarra.guardarPizarra(pizarra);
        }
    }

    static existenteEditarItem(pizarra, itemID) {
        let pizarrasAlmacenadas = Pizarra.#obtenerPizarras();
        const indicePizarraDesactualizada = Pizarra.getIndice(pizarra, pizarrasAlmacenadas);
        Pizarra.#eliminarPizarras();

        const indiceItem = Item.getIndice(itemID, pizarra.getItems());
        pizarra.modificarItem(indiceItem);
        
        pizarra.actualizarInformacion();

        // Reemplazo la pizarra desactualizada por la actualizada, dentro del conjunto de todas las pizarras
        pizarrasAlmacenadas.splice(indicePizarraDesactualizada, 1, pizarra);

        for (const pizarra of pizarrasAlmacenadas) {
            Pizarra.guardarPizarra(pizarra);
        }
    }

    static existenteEliminarItem(pizarra, itemID) {
        let pizarrasAlmacenadas = Pizarra.#obtenerPizarras();
        const indicePizarraDesactualizada = Pizarra.getIndice(pizarra, pizarrasAlmacenadas);
        Pizarra.#eliminarPizarras();

        const indiceItem = Item.getIndice(itemID, pizarra.getItems());
        pizarra.eliminarItem(indiceItem);

        pizarra.actualizarInformacion();

        // Reemplazo la pizarra desactualizada por la actualizada, dentro del conjunto de todas las pizarras
        pizarrasAlmacenadas.splice(indicePizarraDesactualizada, 1, pizarra);

        for (const pizarra of pizarrasAlmacenadas) {
            Pizarra.guardarPizarra(pizarra);
        }
    }

    static existePizarra(pizarra) {
        return Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha) ? true : false;
    }

    static guardarPizarra(pizarra) {
        Almacenamiento.guardar("pizarras", pizarra);
    }

    actualizarInformacion() {
        this.#calcularTotalIngresos();
        this.#calcularTotalEgresos();
    }

    crearRegistros() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const item of this.getItems()) {
            let registroItem = Item.crearRegistro(item);
            ManejadorDOM.agregar(fragmento, registroItem);
        }

        return fragmento;
    }

    static cargarDatosAlmacenados(pizarra) {
        const datosDeAlmacenamiento = Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha);
        pizarra.setItems(datosDeAlmacenamiento.items);
        pizarra.setUltimoItemID(datosDeAlmacenamiento.ultimoItemID);
    }

    static obtenerPizarraDeUsuario(usuarioLogeado) {
        const pizarraDelUsuario = new Pizarra(usuarioLogeado);

        if (Pizarra.existePizarra(pizarraDelUsuario)) {
            Pizarra.cargarDatosAlmacenados(pizarraDelUsuario);
        }

        pizarraDelUsuario.actualizarInformacion();
        return pizarraDelUsuario;
    }
}

export { Pizarra };