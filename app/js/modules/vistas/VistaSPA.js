import { App } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos } from '../servicios.js';

class VistaSPA {
    constructor(datos) {
        let $paginaSPA = document.createElement("div");
        $paginaSPA.classList.add('row', 'm-0');

        $paginaSPA.innerHTML =  `<!-- Header mobile -->
                                <div class="navbar-fixed hide-on-large-only">
                                    <nav class="brown z-depth-4">
                                        <div class="nav-wrapper">
                                            <a class="logo brand-logo white-text" href="index.html" title="logo de espesonal">
                                                <div>ESPERSONAL !</div>
                                            </a>
                                            <ul class="left">
                                                <li>
                                                    <a href="!#" data-target="navegacion" class="btn-menu-mobile pulse waves-effect waves-red sidenav-trigger"><i class="large material-icons right">menu</i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            
                                <!-- Navegacion [Barra lateral izquierda] -->
                                <section class="navegacion">
                                    <ul id="navegacion" class="sidenav sidenav-fixed hoverable h-visible">
                                        <div id="contenedor-menu">
                                            <li>
                                                <div class="header">
                                                    <a class="logo" href="index.html" title="logo de espesonal">
                                                        <div>ESPERSONAL !</div>
                                                        <div class="eslogan">Finanzas personales más grosas</div>
                                                    </a>    
                                                </div>
                                            </li>
                                            
                                            <li><a class="subheader">MENÚ</a></li>
                                            <!-- Aquí se agrega DINÁMICAMENTE -->
                                        </div>
                                        <div>
                                            <li>
                                                <a href="#!" class="subheader"><i class="material-icons left">account_circle</i>
                                                    <strong id="usuario-logeado">${datos.usuario.nombre}</strong>
                                                </a>
                                            </li>
                                            <li><a id="btn-configuracion" class="waves-effect modal-trigger" href="#modal-configuracion"><i class="material-icons left">settings</i>Configuracion</a></li>
                                            
                                            <li><div class="divider"></div></li>
                                            
                                            <li><a id="btn-salir" href="#" class="waves-effect"><i class="material-icons left">logout</i>Salir</a></li>
                                        </div>
                                    </ul>
                                </section>
                                
                                <!-- Contenido de la SPA -->
                                <main>
                                    
                                </main>
                                
                                
                                <!-- Modales -->`;

        // AGREGANDO -> Menú de navegación
        ManejadorDOM.agregarContenidoAlSubElemento($paginaSPA, '#contenedor-menu', datos.menu.items);

        // AGREGANDO -> Modal de registro de usuario
        ManejadorDOM.agregar($paginaSPA, datos.modales.configuracion);

        // CARGANDO -> Opciones a los select año y fecha
        ManejadorDOM.agregarContenidoAlSubElemento($paginaSPA, '#configuracion-select-anio', datos.selects.anio.opciones);
        ManejadorDOM.agregarContenidoAlSubElemento($paginaSPA, '#configuracion-select-mes', datos.selects.fecha.opciones);
        
        // ASOCIANDO EVENTOS
        ManejadorEventos.asociarAlSubElemento($paginaSPA,'#form-configuracion', 'submit', ManejadorEventos.getHandler("formConfiguracion"));
        ManejadorEventos.asociarAlSubElemento($paginaSPA,'.modal-close', 'click', ManejadorEventos.getHandler("cerrarModal"));
        
        ManejadorEventos.asociarAlSubElemento($paginaSPA,'#btn-configuracion', 'click', ManejadorEventos.getHandler("autocompletarFormConfiguracion"));
        ManejadorEventos.asociarAlSubElemento($paginaSPA,'#btn-salir', 'click', ManejadorEventos.getHandler("cerrarApp"));

        ManejadorEventos.asociar(window, 'hashchange', ManejadorEventos.getHandler("actualizarSPA"));

        // INICIALIZANDO COMPONENTES DE TERCEROS
        App.inicializarDependencia('Materialize');

        return $paginaSPA;        
    }
}

export { VistaSPA };