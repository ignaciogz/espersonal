import { ManejadorDOM, Utilidades } from "../servicios.js";
import { Formulario } from "../clases.js";
import { VistaModal } from "../vistas.js";

class Modal {
    static agregarFormulario(modal, formulario) {
        ManejadorDOM.agregarContenidoAlSubElemento(modal, '.modal-content', formulario);
    }

    static cerrar(idModal) {
        const $modalAgregarItem = document.getElementById(idModal);
        const modal = M.Modal.getInstance($modalAgregarItem);
        modal.close();
    }

    static crearConFormulario(titulo, icono, nombreBtnPrincipal) {
        const identificador = Utilidades.obtenerIdentificador(titulo);
        const $modal = VistaModal.crear(identificador, titulo, icono, nombreBtnPrincipal);
        
        let $formulario = null;
        switch (identificador) {
            case 'agregar-item':
            case 'editar-item':
                $formulario = Formulario.crearFormItem(identificador);  
                break;
            case 'configuracion':
                $formulario = Formulario.crearFormConfiguracion(identificador);  
                break;
            case 'registrarse':
                $formulario = Formulario.crearFormRegistrarse(identificador);  
                break;
        };

        Modal.agregarFormulario($modal, $formulario);

        return $modal;
    }
}

export { Modal };