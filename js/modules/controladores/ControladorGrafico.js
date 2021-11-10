class ControladorGrafico {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            // VEREMOS si lo programo o no

            // INICIALIZO componentes de Materialize
            M.AutoInit();
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorGrafico as controlador };