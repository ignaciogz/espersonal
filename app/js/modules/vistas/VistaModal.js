class VistaModal {
    static crear(identificador, titulo, icono, nombreBtnPrincipal) {
        let $modal = document.createElement("div");
        $modal.classList.add('modal', 'modal-fixed-footer');
        $modal.id = `modal-${identificador}`;

        $modal.innerHTML = `<!-- Modal :: Formulario de ${titulo.toLowerCase()} -->
                            <form id="form-${identificador}">
                                <div class="modal-content">
                                    <h4>${titulo}<i class="medium material-icons right">${icono}</i></h4>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn waves-effect waves-red brown" type="submit">${nombreBtnPrincipal}</button>
                                    <a href="#" class="modal-close waves-effect btn-flat">Cancelar</a>
                                </div>
                            </form>`;
        
        return $modal;
    }
}

export { VistaModal };