import { ManejadorDOM, Utilidades } from "../servicios.js";
import { Formulario } from "../clases.js";
import { VistaModal } from "../vistas.js";

class Modal {
    static #agregarContenidoAlModal(modal, contenido) {
        ManejadorDOM.agregarContenidoAlSubElemento(modal, '.modal-content', contenido);
    }

    static cerrar(idModal) {
        const $modalAgregarItem = document.getElementById(`modal-${idModal}`);
        const modal = M.Modal.getInstance($modalAgregarItem);
        modal.close();
    }

    static crear(titulo, icono, nombreBtnPrincipal, nombreBtnSecundario = "Cancelar") {
        const identificador = Utilidades.obtenerIdentificador(titulo);
        const $modal = VistaModal.crear(identificador, titulo, icono, nombreBtnPrincipal, nombreBtnSecundario);
        
        // Obtengo el nombre del método generador de la vista
        const metodoGenerador = Utilidades.obtenerNombeDelMetodoGenerador(identificador);

        // DINÁMICAMENTE Ejecuto el método correspondiente para obtener el contenido
        const $contenido = VistaModal[`crearModal${metodoGenerador}`](identificador);

        Modal.#agregarContenidoAlModal($modal, $contenido);

        return $modal;
    }

    static crearConFormulario(titulo, icono, nombreBtnPrincipal, nombreBtnSecundario = "Cancelar") {
        const identificador = Utilidades.obtenerIdentificador(titulo);
        const $modal = VistaModal.crearConFormulario(identificador, titulo, icono, nombreBtnPrincipal, nombreBtnSecundario);

        // DINÁMICAMENTE Ejecuto el método correspondiente para obtener el contenido
        const $formulario = Formulario.crearFormParaModal(identificador);

        Modal.#agregarContenidoAlModal($modal, $formulario);

        return $modal;
    }
}

export { Modal };