import { App } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos } from '../servicios.js';

class VistaIndex {
    constructor(datos) {
        ManejadorDOM.tituloDePagina(datos.tituloDePagina);

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

        // AGREGANDO -> Modal de registro de usuario
        ManejadorDOM.agregar($paginaIndex, datos.modales.registrarse);
        
        // AGREGANDO -> Elementos del formulario de acceso
        ManejadorDOM.agregarContenidoAlSubElemento($paginaIndex, '#form-acceso', datos.formularios.acceso);

        // REDUCIENDO velocidad de reproducción del video
        ManejadorDOM.cambiarVelocidadDeReproduccionDeVideo($paginaIndex, '.video-marketing video', 0.5);
        
        // ASOCIANDO EVENTOS
        ManejadorEventos.asociarAlSubElemento($paginaIndex, '#form-acceso', 'submit', ManejadorEventos.getHandler("formAcceso"));
        ManejadorEventos.asociarAlSubElemento($paginaIndex, '#form-registrarse', 'submit', ManejadorEventos.getHandler("formRegistrarse"));

        // INICIALIZANDO COMPONENTES DE TERCEROS
        App.inicializarDependencia('Materialize');

        return $paginaIndex;        
    }
}

export { VistaIndex };