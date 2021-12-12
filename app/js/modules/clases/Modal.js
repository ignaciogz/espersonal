import { ManejadorDOM, Utilidades } from "../servicios.js";
import { Formulario } from "../clases.js";
import { VistaModal } from "../vistas.js";

class Modal {
    static agregarContenidoAlModal(modal, contenido) {
        ManejadorDOM.agregarContenidoAlSubElemento(modal, '.modal-content', contenido);
    }

    static cerrar(idModal) {
        const $modalAgregarItem = document.getElementById(`modal-${idModal}`);
        const modal = M.Modal.getInstance($modalAgregarItem);
        modal.close();
    }

    static crearConFormulario(titulo, icono, nombreBtnPrincipal, textoFooter = "") {
        const identificador = Utilidades.obtenerIdentificador(titulo);
        const $modal = VistaModal.crear(identificador, titulo, icono, nombreBtnPrincipal, textoFooter);
        
        let $formulario = null;
        switch (identificador) {
            case 'agregar-item':
            case 'editar-item':
                $formulario = Formulario.crearFormItem(identificador);  
                break;
            case 'configuracion':
                $formulario = Formulario.crearFormConfiguracion(identificador);  
                break;
            case 'eliminar-item':
                $formulario = Formulario.crearFormEliminarItem(identificador);  
                break;
            case 'registrarse':
                $formulario = Formulario.crearFormRegistrarse(identificador);  
                break;
        };

        Modal.agregarContenidoAlModal($modal, $formulario);

        return $modal;
    }
}

export { Modal };