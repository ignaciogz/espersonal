class VistaModal {
    static #getTemplate(identificador, titulo, icono, nombreBtnPrincipal, nombreBtnSecundario, conFormulario = false) {
        const $modalTemplate = `<div class="modal-content">
                                    <div class="row">
                                        <div class="modal-header col s12">${titulo}<i class="medium material-icons right">${icono}</i></div>
                                        <!-- Aquí se agrega DINÁMICAMENTE -->
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button id="btn-modal-${identificador}" class="btn waves-effect waves-red brown" ${conFormulario ? 'type="submit"' : ''}>${nombreBtnPrincipal}</button>
                                    <a href="#!" class="modal-close waves-effect btn-flat">${nombreBtnSecundario}</a>
                                </div>`;
                                
        return $modalTemplate;
    }

    static crear(identificador, titulo, icono, nombreBtnPrincipal, nombreBtnSecundario) {
        let $modal = document.createElement("div");
        $modal.classList.add('modal', 'modal-fixed-footer');
        $modal.id = `modal-${identificador}`;

        $modal.innerHTML = `<!-- Modal :: ${titulo.toLowerCase()} -->
                            ${VistaModal.#getTemplate(identificador, titulo, icono, nombreBtnPrincipal, nombreBtnSecundario)}`;
        
        return $modal;
    }

    static crearConFormulario(identificador, titulo, icono, nombreBtnPrincipal, nombreBtnSecundario) {
        let $modal = document.createElement("div");
        $modal.classList.add('modal', 'modal-fixed-footer');
        $modal.id = `modal-${identificador}`;

        $modal.innerHTML = `<!-- Modal :: Formulario de ${titulo.toLowerCase()} -->
                            <form id="form-${identificador}">
                                ${VistaModal.#getTemplate(identificador, titulo, icono, nombreBtnPrincipal, nombreBtnSecundario, true)}
                            </form>`;
        
        return $modal;
    }

    /* -------- MODALES DE LA APP -------- */
    static crearModalEliminarItem(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="col s12">
                                                <div class="datos-del-item">
                                                    <strong>Nombre:</strong> 
                                                    <p id="${identificador}-nombre"></p>
                                                </div>
                                                <div class="datos-del-item">
                                                    <strong>Tipo:</strong>
                                                    <p id="${identificador}-tipo"></p>
                                                </div>
                                                <div class="datos-del-item">
                                                    <strong>Categoría:</strong>
                                                    <p id="${identificador}-categoria"></p>
                                                </div>
                                                <div class="datos-del-item">
                                                    <strong>Monto:</strong>
                                                    <p id="${identificador}-monto"></p>
                                                </div>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }
}

export { VistaModal };