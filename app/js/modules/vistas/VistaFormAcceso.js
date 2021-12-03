class VistaFormAcceso {
    static crear(identificador, nombreBtnPrincipal, nombreBtnSecundario) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="error red-text center-align">
                                                <div id="error-${identificador}"></div>
                                            </div>
                                            <div class="row">
                                                <div class="input-field col s12">
                                                    <input id="${identificador}-usuario" type="text" required>
                                                    <label for="${identificador}-usuario">Usuario</label>
                                                </div>
                                            
                                                <div class="input-field col s12">
                                                    <input id="${identificador}-contrasena" type="password" required>
                                                    <label for="${identificador}-contrasena">Contraseña</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col s12">
                                                    <button class="btn waves-effect waves-red brown" type="submit" name="action">${nombreBtnPrincipal.toUpperCase()}
                                                        <i class="material-icons left">login</i>
                                                    </button>
                                                    <a class="waves-effect btn-flat modal-trigger" href="#modal-${nombreBtnSecundario.toLowerCase()}">${nombreBtnSecundario}</a>
                                                </div>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }
}

export { VistaFormAcceso };