document.addEventListener('DOMContentLoaded', init);

function init() {
    // INICIALIZO objetos globales de mi app
    this.categorias = new Categorias();

    /* Controlador frontal básico */
    switch (Navegador.paginaActual()) {
        case "index.html":
                if(Navegador.usuarioEstaLogeado()) {
                    Navegador.redireccionar("pizarra.html");
                } else {
                    this.usuario = new Usuario();
                    this.usuario.cargarUsuariosPredefinidos();

                    // REDUCIENDO velocidad de reproducción del video
                    const $videoMarketing = document.querySelector('.video-marketing video');    
                    if (ManejadorDOM.existeEnDOM($videoMarketing)) {
                        Video.cambiarVelocidadDeReproduccion($videoMarketing, 0.5);
                    }

                    // ASOCIANDO EVENTOS a formularios del index.html
                    const $formAcceso = document.getElementById('form-acceso');
                    if (ManejadorDOM.existeEnDOM($formAcceso)) {
                        $formAcceso.addEventListener('submit', ManejadorEventos.validarFormAcceso().bind(this));
                    }

                    const $formRegistrarse = document.getElementById('form-registrarse');
                    if (ManejadorDOM.existeEnDOM($formRegistrarse)) {
                        $formRegistrarse.addEventListener('submit', ManejadorEventos.validarFormRegistrarse().bind(this));    
                    }
                }
            break;
        case "pizarra.html":
                if(Navegador.usuarioEstaLogeado()) {
                    const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
                    // * Agregar aquí -> Lógica de pizarra seleccionada *

                    // CREANDO DINÁMICAMENTE opciones del select año del formulario de configuración
                    const $selectAnio = document.getElementById('select-anio');

                    if (ManejadorDOM.existeEnDOM($selectAnio)) {
                        const fragmento = ManejadorDOM.crearFragmento();

                        for (let anio = usuarioLogeado.anioDeRegistro; anio <= usuarioLogeado.anioDeRegistro + 3; anio++) {
                            let selectAnio = Formulario.crearSelectAnio(anio);
                            ManejadorDOM.agregar(fragmento, selectAnio);
                        }

                        ManejadorDOM.agregar($selectAnio, fragmento);
                    }
                    
                    // ASOCIANDO EVENTO a formulario de configuración
                    const $formAcceso = document.getElementById('form-acceso');
                    if (ManejadorDOM.existeEnDOM($formAcceso)) {
                        $formAcceso.addEventListener('submit', ManejadorEventos.validarFormAcceso().bind(this));
                    }

                    // ASOCIANDO EVENTO a barra lateral
                    const $btnSalir = document.getElementById('btn-salir');
                    if (ManejadorDOM.existeEnDOM($btnSalir)) {
                        $btnSalir.addEventListener('click', ManejadorEventos.cerrarApp());
                    }
                } else {
                    Navegador.redireccionar("index.html");
                }
            break;
        case "grafico.html":
                if(Navegador.usuarioEstaLogeado()) {
                       // VEREMOS 
                } else {
                    Navegador.redireccionar("index.html");
                }
            break;
        case "categorias.html":
                if(Navegador.usuarioEstaLogeado()) {
                    //  CREANDO DINÁMICAMENTE categorias
                    const $cardsCategorias = document.getElementById('contenedor-cards-categorias');

                    if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
                        const fragmento = ManejadorDOM.crearFragmento();

                        for (const categoria of this.categorias.obtenerCategorias()) {
                            let cardCategoria = Categoria.crearCardCategoria(categoria.nombre, categoria.descripcion, categoria.icono);
                            ManejadorDOM.agregar(fragmento, cardCategoria);
                        }

                        ManejadorDOM.agregar($cardsCategorias, fragmento);
                    }


                    // CREANDO DINÁMICAMENTE opciones del select año del formulario de configuración
                    const $selectAnio = document.getElementById('select-anio');

                    if (ManejadorDOM.existeEnDOM($selectAnio)) {
                        const fragmento = ManejadorDOM.crearFragmento();

                        for (let anio = usuarioLogeado.anioDeRegistro; anio <= usuarioLogeado.anioDeRegistro + 3; anio++) {
                            let selectAnio = Formulario.crearSelectAnio(anio);
                            ManejadorDOM.agregar(fragmento, selectAnio);
                        }

                        ManejadorDOM.agregar($selectAnio, fragmento);
                    }

                    
                    // ASOCIANDO EVENTO a formulario de configuración
                    const $formAcceso = document.getElementById('form-acceso');
                    if (ManejadorDOM.existeEnDOM($formAcceso)) {
                        $formAcceso.addEventListener('submit', ManejadorEventos.validarFormAcceso().bind(this));
                    }


                    // ASOCIANDO EVENTO a barra lateral
                    const $btnSalir = document.getElementById('btn-salir');
                    if (ManejadorDOM.existeEnDOM($btnSalir)) {
                        $btnSalir.addEventListener('click', ManejadorEventos.cerrarApp());
                    }
                } else {
                    Navegador.redireccionar("index.html");
                }
            break;
    }

    // INICIALIZO componentes del framework
    M.AutoInit();
}

const JSON_categoriasPredefinidas = `[
    { 
        "nombre":"Comida",
        "descripcion":"Descripcion - Categoria Comida",
        "icono":"fastfood"
    },
    { 
        "nombre":"Deportes",
        "descripcion":"Descripcion - Categoria Deportes",
        "icono":"sports_handball"
    },
    { 
        "nombre":"Deudas",
        "descripcion":"Descripcion - Categoria Deudas",
        "icono":"receipt"
    },
    { 
        "nombre":"Entretenimiento",
        "descripcion":"Descripcion - Categoria Entretenimiento",
        "icono":"celebration"
    },
    { 
        "nombre":"Facturas",
        "descripcion":"Descripcion - Categoria Factura",
        "icono":"receipt_long"
    },
    { 
        "nombre":"Gimnasio",
        "descripcion":"Descripcion - Categoria Gimnasio",
        "icono":"fitness_center"
    },
    { 
        "nombre":"Hogar",
        "descripcion":"Descripcion - Categoria Hogar",
        "icono":"home"
    },
    { 
        "nombre":"Mascotas",
        "descripcion":"Descripcion - Categoria Mascotas",
        "icono":"pets"
    },
    { 
        "nombre":"Regalos",
        "descripcion":"Descripcion - Categoria Regalos",
        "icono":"card_giftcard"
    },
    { 
        "nombre":"Restaurantes",
        "descripcion":"Descripcion - Categoria Restaurantes",
        "icono":"restaurant"
    },
    { 
        "nombre":"Ropa",
        "descripcion":"Descripcion - Categoria Ropa",
        "icono":"shopping_bag"
    },
    { 
        "nombre":"Salud",
        "descripcion":"Descripcion - Categoria Salud",
        "icono":"health_and_safety"
    },
    { 
        "nombre":"Tarjeta de crédito",
        "descripcion":"Descripcion - Categoria Tarjeta de credito",
        "icono":"credit_card"
    },
    { 
        "nombre":"Transporte",
        "descripcion":"Descripcion - Categoria Transporte",
        "icono":"commute"
    }
]`;

const JSON_usuariosPredefinidos = `[
    { 
        "nombre":"coder",
        "contrasena":"house",
        "tipo":"super admin",
        "anioDeRegistro":2030
    }
]`;

class Categoria {
    constructor(nombre, descripcion, icono) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.icono = icono;
    }

    static crearCardCategoria(nombre, descripcion, icono) {
        let $divColumna = document.createElement("div");
            $divColumna.classList.add('col', 's6', 'm4');
                        
        $divColumna.innerHTML  =    `<h2 class="card-header">${nombre}</h2>
                                    <div class="card horizontal">
                                        <div class="card-image">
                                            <i class="medium material-icons right">${icono}</i>
                                        </div>
                                        <div class="card-stacked">
                                            <div class="card-content">
                                                <p>${descripcion}</p>
                                            </div>
                                        </div>
                                    </div>`;
    
        return $divColumna;
    }
}

class Categorias {
    constructor() {
        this.listado = [];
        this.cargarCategoriasPredefinidas();
    }

    // Métodos privados
    cargarCategoriasPredefinidas() {
        const categoriasPredefinidas = JSON.parse(JSON_categoriasPredefinidas);
        
        for (const categoria of categoriasPredefinidas) {
            this.listado.push(
                new Categoria(categoria.nombre, categoria.descripcion, categoria.icono)
            );
        }
    }

    // Métodos públicos
    existeCategoria(nombreDeCategoria) {
        return this.listado.find(elemento => elemento.nombre === nombreDeCategoria) ? true : false;
    }

    obtenerCategoria(nombreDeCategoria) {
        return this.listado.find(elemento => elemento.nombre === nombreDeCategoria);
    }

    obtenerCategorias() {
        return this.listado;
    }
}

class Usuario {
    constructor(nombre = null, contrasena = null, tipo = "invitado", anioDeRegistro = null) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.tipo = tipo;
        this.anioDeRegistro = anioDeRegistro;
    }

    // Métodos privados
    cargarUsuariosPredefinidos() {
        const usuariosPredefinidos = JSON.parse(JSON_usuariosPredefinidos);
        
        for (const usuario of usuariosPredefinidos) {
            if (!Usuario.existeUsuario(usuario)) {
                Usuario.guardarUsuario(usuario);
            }            
        }
    }

    validarUsuario() {
        if (Almacenamiento.existe("usuarios_registrados")) {
            const usuariosRegistrados = Almacenamiento.obtener("usuarios_registrados");
        
            function datosDeUsuarioBuscado(elemento) {
                return elemento.nombre === this.nombre && elemento.contrasena === this.contrasena;
            }
            return usuariosRegistrados.find(datosDeUsuarioBuscado.bind(this)) ? true : false;
        } else {
            return false;
        }
    }

    // Métodos públicos
    setAnioDeRegistro(anio) {
        this.anioDeRegistro = anio;
    }

    setDatosDeUsuario(datoUsuario, datoContrasena) {
        this.nombre = datoUsuario;
        this.contrasena = datoContrasena;
    }

    setTipoDeUsuario(tipo) {
        this.tipo = tipo;
    }

    static buscarUsuario(usuario) {
        if (Almacenamiento.existe("usuarios_registrados")) {
            const usuariosRegistrados = Almacenamiento.obtener("usuarios_registrados");
            
            function nombreUsuarioBuscado(elemento) {
                return elemento.nombre === usuario.nombre;
            }

            return usuariosRegistrados.find(nombreUsuarioBuscado);
        } else {
            return undefined;
        }
    }

    static existeUsuario(usuario) {
        return Usuario.buscarUsuario(usuario) ? true : false;
    }

    static guardarUsuario(usuario) {
        console.log(usuario);
        Almacenamiento.guardar("usuarios_registrados", usuario);
    }

    logearUsuario() {
        return this.validarUsuario() ? true : false;
    }

    static obtenerUsuarioLogeado() {
        if (Sesion.existe("usuario_logeado")) {
            let usuarioLogeado = Sesion.obtener("usuario_logeado");
            usuarioLogeado = usuarioLogeado.pop();

            return usuarioLogeado; 
        } else {
            return undefined;
        } 
    }
}

class Formulario {
    static crearSelectAnio(anio) {
        let $option = document.createElement("option");
            $option.setAttribute("value", anio);
                        
        $option.text  = anio;
    
        return $option;
    } 
}

class Video {
    static cambiarVelocidadDeReproduccion(video, velocidad) {
        video.playbackRate = velocidad;
    } 
}

class ManejadorDOM {
    static agregar(contenedor, elemento) {
        contenedor.appendChild(elemento);
    }

    static crearFragmento() {
        return document.createDocumentFragment();
    }

    static existeEnDOM(nodo) {
        return (nodo === document.body) ? false : document.body.contains(nodo);
    }   
}

class ManejadorEventos {
    static cerrarApp() {
        return function (e) {
            e.preventDefault();
            Navegador.cerrarSesion();
            Navegador.redireccionar("index.html");
        }
    }

    static validarFormAcceso() {
        return function (e) {
            e.preventDefault();
            const formulario = e.target;

            const datoUsuario = document.getElementById('acceso-usuario').value;
            const datoContrasena = document.getElementById('acceso-contrasena').value;
            
            this.usuario.setDatosDeUsuario(datoUsuario, datoContrasena);

            if (this.usuario.logearUsuario()) {
                alert("Bienvenido ! " + this.usuario.nombre);
                Navegador.iniciarSesion(this.usuario);
                formulario.reset();
                Navegador.redireccionar("pizarra.html");
            } else {
                alert("Error:\nDatos de ingreso incorrectos");
                formulario.reset();
            }
        }
    }

    static validarFormRegistrarse() {
        return function (e) {
            e.preventDefault();
            const formulario = e.target;

            const datoUsuario = document.getElementById('registrarse-usuario').value;
            const datoContrasena = document.getElementById('registrarse-contrasena').value;

            this.usuario.setDatosDeUsuario(datoUsuario, datoContrasena);

            if (!Usuario.existeUsuario(this.usuario)) {
                alert("Bienvenido NUEVO Usuario!");
                this.usuario.setTipoDeUsuario("registrado");
                this.usuario.setAnioDeRegistro(Fecha.anio);
                Usuario.guardarUsuario(this.usuario);
                
                Navegador.iniciarSesion(this.usuario);
                formulario.reset();
                Navegador.redireccionar("pizarra.html");
            } else {
                alert("Error:\nNombre de usuario NO disponible");
                formulario.reset();
            }
        }
    }
}

class Navegador {
    static cerrarSesion() {
        Sesion.eliminar("usuario_logeado");
    }

    static iniciarSesion(usuario) {
        usuario = Usuario.buscarUsuario(usuario);
        const datosDeSesion = new Sesion(usuario.nombre, usuario.anioDeRegistro, Fecha.getFechaFormateada());
        Sesion.guardar("usuario_logeado", datosDeSesion);
    }

    static paginaActual() {
        return location.pathname.split("/").pop();
    }

    static redireccionar(ubicacion) {
        setTimeout( function() { location = ubicacion; }, 1000 );
    }

    static usuarioEstaLogeado() {
        return Sesion.existe("usuario_logeado");
    }
}

class Fecha {
    // Propiedades privadas
    static hoy = new Date();
    static meses = [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ];
                
    // Propiedades públicas
    static anio = Fecha.hoy.getFullYear();
    static mes = Fecha.meses[Fecha.hoy.getMonth()];

    // Métodos públicos
    static getFechaFormateada() {
        return `${Fecha.anio} - ${Fecha.mes}`;
    }

    static setFecha(anio, mes) {
        Fecha.anio = anio;
        Fecha.mes = mes;
    }
}

// Las clases Almacenamiento y Sesion trabajan con array de objetos
class Almacenamiento {
    static existe(clave) {
        return localStorage.getItem(clave) !== null;
    }

    static guardar(clave, valor) {
        let almacenado;

        if (Almacenamiento.existe(clave)) {
            almacenado = Almacenamiento.obtener(clave);
        } else {
            almacenado = new Array();
        }  
        
        almacenado.push(valor);
  
        const JSON_almacenado = JSON.stringify(almacenado);
        localStorage.setItem(clave, JSON_almacenado);
    }

    static obtener(clave) {
        return JSON.parse(localStorage.getItem(clave));
    }
}

class Sesion {
    constructor(nombre, anioDeRegistro, fechaSeleccionada) {
        this.nombre = nombre;
        this.anioDeRegistro = anioDeRegistro;
        this.fechaSeleccionada = fechaSeleccionada;
    }

    static eliminar(clave) {
        sessionStorage.removeItem(clave);
    }

    static existe(clave) {
        return sessionStorage.getItem(clave) !== null;
    }

    static guardar(clave, valor) {
        let almacenado;

        if (Sesion.existe(clave)) {
            almacenado = Sesion.obtener(clave);
        } else {
            almacenado = new Array();
        }  
        
        almacenado.push(valor);
  
        const JSON_almacenado = JSON.stringify(almacenado);
        sessionStorage.setItem(clave, JSON_almacenado);
    }

    static obtener(clave) {
        return JSON.parse(sessionStorage.getItem(clave));
    }
}