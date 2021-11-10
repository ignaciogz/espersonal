class App {
    static ejecutarControlador(controlador) {
        import(`../controladores/${controlador}.js`)
        .then(module => module.controlador.ejecutar());
    }

    static inicializarDependencia(nombreDeDependencia) {
        import(`../dependencias/${nombreDeDependencia}.js`)
        .then(module => module.dependencia.inicializar());
    }
}

export { App };