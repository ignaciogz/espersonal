class Modal {
    static cerrar(idModal) {
        const $modalAgregarItem = document.getElementById(idModal);
        const modal = M.Modal.getInstance($modalAgregarItem);
        modal.close();
    }
}

export { Modal };