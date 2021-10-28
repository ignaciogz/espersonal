document.addEventListener('DOMContentLoaded', init);

function init() {
    // Inicializo componentes del framework
    M.AutoInit();

    // Inicializo objetos globales de mi app
    this.categorias = new Categorias();

    /* Controlador frontal basico */
    switch (Navegador.paginaActual()) {
        case "index.html":
                // Inicializo objetos globales de mi app
                if(Navegador.usuarioEstaLogeado()) {
                    Navegador.redireccionar("pizarra.html");
                } else {
                    this.usuario = new Usuario();
                    this.usuario.cargarUsuariosPredefinidos();

                    // Reduciendo velocidad de reproducción del video
                    const $videoMarketing = document.querySelector('.video-marketing video');    
                    if (ManejadorDOM.existeEnDOM($videoMarketing)) {
                        $videoMarketing.playbackRate = 0.5;
                    }

                    // Asociando eventos a formularios
                    const $formAcceso = document.getElementById('form-acceso');
                    if (ManejadorDOM.existeEnDOM($formAcceso)) {
                        $formAcceso.addEventListener('submit', ManejadorEventos.validarFormAcceso().bind(this));
                    }
                }
            break;
        case "pizarra.html":
            break;
        case "grafico.html":
            break;
        case "categorias.html":
                // Mostrando categorias
                const $cardsCategorias = document.getElementById('contenedor-cards-categorias');
                const fragmento = ManejadorDOM.crearFragmento();

                if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
                    let cardCategoria;

                    for (const categoria of this.categorias.obtenerCategorias()) {
                        cardCategoria = ManejadorDOM.crearCardCategoria(categoria.nombre, categoria.descripcion, categoria.icono);
                        ManejadorDOM.agregar(fragmento, cardCategoria);
                    }

                    ManejadorDOM.agregar($cardsCategorias, fragmento);
                }
            break;
    }
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
        "tipo":"super admin"
    }
]`;

class Categoria {
    constructor(nombre, descripcion, icono) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.icono = icono;
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
    constructor(nombre = null, contrasena = null, tipo = "invitado") {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.tipo = tipo;
    }

    // Métodos privados
    cargarUsuariosPredefinidos() {
        const usuariosPredefinidos = JSON.parse(JSON_usuariosPredefinidos);
        
        for (const usuario of usuariosPredefinidos) {
            if (!this.existeUsuario(usuario)) {
                this.guardarUsuario(usuario);
            }            
        }
    }

    existeUsuario(usuario) {
        if (Almacenamiento.existe("usuarios_registrados")) {
            const usuariosRegistrados = Almacenamiento.obtener("usuarios_registrados");
            
            function nombreUsuarioBuscado(elemento) {
                return elemento.nombre === usuario.nombre;
            }

            return usuariosRegistrados.find(nombreUsuarioBuscado) ? true : false;
        } else {
            return false;
        }
    }

    guardarUsuario(usuario) {
        const nuevoUsuario = new Usuario(usuario.nombre, usuario.contrasena, usuario.tipo);
        Almacenamiento.guardar("usuarios_registrados", nuevoUsuario);
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
    cargarDatosDeUsuario(datoUsuario, datoContrasena) {
        this.nombre = datoUsuario;
        this.contrasena = datoContrasena;
    }

    logearUsuario() {
        if (this.validarUsuario()) {
            return true;
        } else {
            return false;
        }
    }
}

class ManejadorDOM {
    static agregar(contenedor, elemento) {
        contenedor.appendChild(elemento);
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
                                    </div>`
    
        return $divColumna;
    }

    static crearFragmento() {
        return document.createDocumentFragment();
    }

    static existeEnDOM(nodo) {
        return (nodo === document.body) ? false : document.body.contains(nodo);
    }
}

class ManejadorEventos {
    static validarFormAcceso() {
        return function (e) {
            e.preventDefault();
            const formulario = e.target;

            const datoUsuario = document.getElementById('acceso-usuario').value;
            const datoContrasena = document.getElementById('acceso-contrasena').value;
            
            this.usuario.cargarDatosDeUsuario(datoUsuario, datoContrasena);

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
}

class Navegador {
    static cerrarSesion() {
        Sesion.eliminar("usuario_logeado");
    }

    static iniciarSesion(usuario) {
        const datosDeSesion = new Sesion(usuario.nombre, Fecha.getFechaFormateada());
        Sesion.guardar("usuario_logeado", datosDeSesion);
    }

    static paginaActual() {
        return location.pathname.split("/").pop();
    }

    static redireccionar(ubicacion) {
        setTimeout( function() { location = ubicacion; }, 1000 );
    }

    static usuarioEstaLogeado() {
        Sesion.existe("usuario_logeado");
    }
}

class Almacenamiento { // La clase trabaja con array de objetos
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
        return JSON.parse(localStorage.getItem(clave))
    }
}

class Sesion {
    constructor(nombre, fechaActual, fechaSeleccionada = null, pizarra = null) {
        this.nombre = nombre;
        this.fechaActual = fechaActual;
        this.fechaSeleccionada = fechaSeleccionada;
        this.pizarra = pizarra
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
        return JSON.parse(sessionStorage.getItem(clave))
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