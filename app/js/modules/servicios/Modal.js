import { ManejadorDOM, Utilidades } from "../servicios.js";
import { VistaFormConfiguracion, VistaFormItem, VistaFormRegistrarse, VistaModal } from "../vistas.js";

class Modal {
    static agregarContenido(modal, contenido) {
        const divModalContent = $(modal).find('.modal-content');
        ManejadorDOM.agregar(divModalContent, contenido);
    }

    static cerrar(idModal) {
        const $modalAgregarItem = document.getElementById(idModal);
        const modal = M.Modal.getInstance($modalAgregarItem);
        modal.close();
    }

    static crearConFormulario(titulo, icono, nombreBtnPrincipal) {
        const identificador = Modal.obtenerIdentificador(titulo);
        const $modal = VistaModal.crear(identificador, titulo, icono, nombreBtnPrincipal);
        
        let $contenido = null;
        switch (titulo) {
            case 'Agregar Item':
            case 'Editar Item':
                $contenido = VistaFormItem.crear(identificador);  
                break;
            case 'Configuración':
                $contenido = VistaFormConfiguracion.crear(identificador);  
                break;
            case 'Registrarse':
                $contenido = VistaFormRegistrarse.crear(identificador);  
                break;
        };

        Modal.agregarContenido($modal, $contenido);

        return $modal;
    }

    static obtenerIdentificador(titulo) {
        const identificador = titulo.toLowerCase().replace(" ", "-");
        return Utilidades.sanitizarIdentificador(identificador);
    }
}

export { Modal };