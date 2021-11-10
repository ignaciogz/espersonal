class App {
    static ejecutarControlador(controlador) {
        import(`../controladores/${controlador}.js`)
        .then(module => module.controlador.ejecutar());
    }
}

export { App };