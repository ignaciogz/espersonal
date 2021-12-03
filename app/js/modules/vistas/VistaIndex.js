class VistaIndex {
    constructor() {
        let $paginaIndex = document.createElement("div");
        $paginaIndex.classList.add('row', 'm-0');

        $paginaIndex.innerHTML =    `<!-- Acceso de usuario -->
                                    <div class="col s12 l7 p-0">
                                        <section class="login h-visible valign-wrapper">
                                            <div class="container">
                                                <!-- Logo -->
                                                <div class="row">
                                                    <div class="col s12">
                                                        <a class="logo" href="index.html" title="logo de espesonal">
                                                            <div><span>ESTO </span>ESPERSONAL !</div>
                                                            <div class="eslogan">Finanzas personales más grosas</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <!-- Formulario de acceso -->
                                                <form id="form-acceso">
                                                    <div class="error red-text center-align">
                                                        <div id="error-acceso"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="input-field col s12">
                                                            <input id="acceso-usuario" type="text" required>
                                                            <label for="acceso-usuario">Usuario</label>
                                                        </div>
                                                    
                                                        <div class="input-field col s12">
                                                            <input id="acceso-contrasena" type="password" required>
                                                            <label for="acceso-contrasena">Contraseña</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col s12">
                                                            <button class="btn waves-effect waves-red brown" type="submit" name="action">INGRESAR
                                                                <i class="material-icons left">login</i>
                                                            </button>
                                                            <a class="waves-effect btn-flat modal-trigger" href="#modal-registrarse">Registrarse</a>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div class="row">
                                                    <div class="col s12">
                                                        <small class="datos-de-acceso">* Usuario: coder - Contraseña: house</small>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <!-- Copyright -->
                                            <small class="copyright">
                                                esPersonal ! <span>&copy;</span> 2021 <span>|</span> Desarrollado por <h2 class="desarrollador">Ignacio Gutierrez</h2>
                                            </small>

                                        </section>
                                    </div>
                                    
                                    <!-- Video marketing -->
                                    <div class="col l5 hide-on-med-and-down p-0">
                                        <section class="video-marketing h-visible">
                                            <video class="responsive-video" title="Video de hombre gritando eufóricamente: ESTO ESPERSONAL !" autoplay loop muted preload="auto" loading="eager">
                                                <!-- <source src="video/esto-espersonal.webm" type="video/webm"> -->
                                                <source src="video/esto-espersonal.mp4" type="video/mp4">
                                            </video>
                                        </section>
                                    </div>`;
        
        return $paginaIndex;        
    }
}

export { VistaIndex };