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
    #calcularBalance() {
        return this.totalIngresos - this.totalEgresos;
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

    #filtrarItems(propiedad, valor) {
        return this.items.filter(elemento => elemento[propiedad] === valor);
    }

    #obtenerItemsDeCategoria(categoriaDeItem) {
        return this.#filtrarItems("categoria", categoriaDeItem);
    }

    #obtenerItemsDeTipo(tipoDeItem) {
        return this.#filtrarItems("tipo", tipoDeItem);
    }

    // Métodos públicos
    actualizarInformacion() {
        this.#calcularTotalIngresos();
        this.#calcularTotalEgresos();
    }

    agregarItem(item) {
        this.items.push(item);
    }

    crearRegistros() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const item of this.getItems()) {
            let registroItem = Item.crearRegistro(item);
            ManejadorDOM.agregar(fragmento, registroItem);
        }

        return fragmento;
    }

    eliminarItem(indiceItem) {
        this.items.splice(indiceItem, 1);
    }

    getBalance() {
        return this.#calcularBalance();
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

    getTotalIngresos() {
        return this.totalIngresos;
    }

    getTotalEgresos() {
        return this.totalEgresos;
    }

    reemplazarItem(indiceItem, itemModificado) {
        this.items.splice(indiceItem, 1, itemModificado);
    }

    setItems(items) {
        this.items = items;
    }

    setUltimoItemID(ultimoItemID) {
        this.ultimoItemID = ultimoItemID;
    }

    static cargarDatosAlmacenados(pizarra) {
        const datosDeAlmacenamiento = Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha);
        pizarra.setItems(datosDeAlmacenamiento.items);
        pizarra.setUltimoItemID(datosDeAlmacenamiento.ultimoItemID);
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
        const fn_busqueda = Pizarra.fn_pizarraDeUsuarioBuscada(pizarra.usuario, pizarra.fecha);

        return pizarras.findIndex(fn_busqueda);
    }

    static existenteAgregarItem(pizarra, item) {
        pizarra.agregarItem(item);

        Pizarra.actualizarPizarra(pizarra);
    }

    static existenteEditarItem(pizarra, itemID, itemModificado) {
        const indiceItem = Item.getIndice(itemID, pizarra.getItems());
        pizarra.reemplazarItem(indiceItem, itemModificado);

        Pizarra.actualizarPizarra(pizarra);
    }

    static existenteEliminarItem(pizarra, itemID) {
        const indiceItem = Item.getIndice(itemID, pizarra.getItems());
        pizarra.eliminarItem(indiceItem);

        Pizarra.actualizarPizarra(pizarra);
    }

    static nuevaAgregarItem(pizarra, item) {
        pizarra.agregarItem(item);
        pizarra.actualizarInformacion();
        
        Pizarra.guardarPizarra(pizarra);
    }

    static obtenerPizarraDeUsuario(usuarioLogeado) {
        const pizarraDelUsuario = new Pizarra(usuarioLogeado);

        if (Pizarra.existePizarra(pizarraDelUsuario)) {
            Pizarra.cargarDatosAlmacenados(pizarraDelUsuario);
        }

        pizarraDelUsuario.actualizarInformacion();
        return pizarraDelUsuario;
    }

    static actualizarPizarra(pizarra) {
        let pizarrasAlmacenadas = Pizarra.#obtenerPizarras();
        const indicePizarraDesactualizada = Pizarra.getIndice(pizarra, pizarrasAlmacenadas);
        Pizarra.#eliminarPizarras();

        pizarra.actualizarInformacion();

        // Reemplazo la pizarra desactualizada por la actualizada, dentro del conjunto de todas las pizarras
        pizarrasAlmacenadas.splice(indicePizarraDesactualizada, 1, pizarra);

        for (const pizarra of pizarrasAlmacenadas) {
            Pizarra.guardarPizarra(pizarra);
        }
    }

    static buscarPizarra(usuario, fecha) {
        if (Almacenamiento.existe("pizarras")) {
            const fn_busqueda = Pizarra.fn_pizarraDeUsuarioBuscada(usuario, fecha);

            return Almacenamiento.buscar("pizarras", fn_busqueda);
        } else {
            return undefined;
        }
    }

    static existePizarra(pizarra) {
        return Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha) ? true : false;
    }

    static guardarPizarra(pizarra) {
        Almacenamiento.guardar("pizarras", pizarra);
    }

    static fn_pizarraDeUsuarioBuscada(usuario, fecha) {
        return elemento => elemento.usuario === usuario && elemento.fecha === fecha;
    }
}

export { Pizarra };