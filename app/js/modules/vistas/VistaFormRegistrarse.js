class VistaFormRegistrarse {
    static crear(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="error red-text center-align">
                                                <div id="error-${identificador}"></div>
                                            </div>
                                            <div class="row">
                                                <div class="input-field col s6">
                                                    <input id="${identificador}-usuario" type="text" required>
                                                    <label for="${identificador}-usuario">Usuario</label>
                                                </div>
                                            
                                                <div class="input-field col s6">
                                                    <input id="${identificador}-contrasena" type="password" minlength="5" required>
                                                    <label for="${identificador}-contrasena">Contraseña</label>
                                                </div>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }
}

export { VistaFormRegistrarse };