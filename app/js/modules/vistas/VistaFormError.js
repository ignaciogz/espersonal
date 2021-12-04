class VistaFormError {
    static crearContenedor(input) {
        const $contenedor = document.createElement('span');
        $contenedor.classList.add('form-error', 'none');
            
        $contenedor.id = `error-${input.id}`;
        $contenedor.innerHTML = input.title;

        return $contenedor;
    }
}

export { VistaFormError };