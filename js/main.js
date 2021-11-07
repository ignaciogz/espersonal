/* ******************** ARCHIVO PRINCIPAL ******************** */
document.addEventListener('DOMContentLoaded', init);

function init() {
    /* Controlador Frontal */
    const pagina = Navegador.paginaActual;
    if (Ruteador.existe(pagina)) {
        const controlador = Ruteador.getControlador(pagina);
        App.ejecutarControlador(controlador);
    }
    else {
        throw "La página solicitada NO existe en el archivo de rutas";
    }

    // INICIALIZO componentes de Materialize
    M.AutoInit();
}


/* ***************** ARCHIVOS JSON A CONSUMIR ***************** */
const JSON_rutas = `[
    {
        "index.html":"ControladorIndex",
        "pizarra.html":"ControladorPizarra",
        "grafico.html":"ControladorGrafico",
        "categorias.html":"ControladorCategorias"
    }
]`;

const JSON_categoriasPredefinidas = `[
    { 
        "nombre":"Comida",
        "descripcion":"Descripción - Categoría Comida",
        "icono":"fastfood"
    },
    { 
        "nombre":"Deportes",
        "descripcion":"Descripción - Categoría Deportes",
        "icono":"sports_handball"
    },
    { 
        "nombre":"Deudas",
        "descripcion":"Descripción - Categoría Deudas",
        "icono":"receipt"
    },
    { 
        "nombre":"Entretenimiento",
        "descripcion":"Descripción - Categoría Entretenimiento",
        "icono":"celebration"
    },
    { 
        "nombre":"Facturas",
        "descripcion":"Descripción - Categoría Factura",
        "icono":"receipt_long"
    },
    { 
        "nombre":"Gimnasio",
        "descripcion":"Descripción - Categoría Gimnasio",
        "icono":"fitness_center"
    },
    { 
        "nombre":"Hogar",
        "descripcion":"Descripción - Categoría Hogar",
        "icono":"home"
    },
    { 
        "nombre":"Mascotas",
        "descripcion":"Descripción - Categoría Mascotas",
        "icono":"pets"
    },
    { 
        "nombre":"Regalos",
        "descripcion":"Descripción - Categoría Regalos",
        "icono":"card_giftcard"
    },
    { 
        "nombre":"Restaurantes",
        "descripcion":"Descripción - Categoría Restaurantes",
        "icono":"restaurant"
    },
    { 
        "nombre":"Ropa",
        "descripcion":"Descripción - Categoría Ropa",
        "icono":"shopping_bag"
    },
    { 
        "nombre":"Salud",
        "descripcion":"Descripción - Categoría Salud",
        "icono":"health_and_safety"
    },
    { 
        "nombre":"Tarjeta de crédito",
        "descripcion":"Descripción - Categoría Tarjeta de crédito",
        "icono":"credit_card"
    },
    { 
        "nombre":"Transporte",
        "descripcion":"Descripción - Categoría Transporte",
        "icono":"commute"
    }
]`;

const JSON_pizarrasPredefinidas = `[
    { 
        "usuario":"coder",
        "fecha":"2021 - Noviembre",
        "items":[
            {
                "tipo":"Ingreso",
                "categoria":null,
                "nombre":"Sueldo del mes",
                "monto":55000
            },
            {
                "tipo":"Egreso",
                "categoria":"Ropa",
                "nombre":"3 remeras de local X",
                "monto":2800
            },
            {
                "tipo":"Egreso",
                "categoria":"Salud",
                "nombre":"Medicamentos varios",
                "monto":950
            },
            {
                "tipo":"Egreso",
                "categoria":"Comida",
                "nombre":"Coto",
                "monto":12320.70
            },
            {
                "tipo":"Ingreso",
                "categoria":null,
                "nombre":"Trabajo freelance Pepito",
                "monto":20000
            },
            {
                "tipo":"Egreso",
                "categoria":"Transporte",
                "nombre":"Nafta del mes",
                "monto":5000
            },
            {
                "tipo":"Egreso",
                "categoria":"Facturas",
                "nombre":"Luz del mes",
                "monto":1140.37
            },
            {
                "tipo":"Egreso",
                "categoria":"Mascotas",
                "nombre":"Vacunas del año",
                "monto":3500
            },
            {
                "tipo":"Egreso",
                "categoria":"Facturas",
                "nombre":"Servicio de internet",
                "monto":2500
            },
            {
                "tipo":"Egreso",
                "categoria":"Tarjeta de crédito",
                "nombre":"HSBC",
                "monto":9620.54
            },
            {
                "tipo":"Egreso",
                "categoria":"Comida",
                "nombre":"Dia online",
                "monto":2100
            },
            {
                "tipo":"Egreso",
                "categoria":"Entretenimiento",
                "nombre":"Salida al cine",
                "monto":1400
            },
            {
                "tipo":"Egreso",
                "categoria":"Deudas",
                "nombre":"Pago deuda a mi primo",
                "monto":650
            }
        ],
        "totalIngresos":45000,
        "totalEgresos":4000
    },
    { 
        "usuario":"coder",
        "fecha":"2021 - Diciembre",
        "items":[
            {
                "tipo":"Ingreso",
                "categoria":null,
                "nombre":"Sueldo del mes",
                "monto":48000
            },
            {
                "tipo":"Egreso",
                "categoria":"Comida",
                "nombre":"Supermercado Coto",
                "monto":15000
            },
            {
                "tipo":"Egreso",
                "categoria":"Hogar",
                "nombre":"Pinturas para el nuevo cuarto",
                "monto":6000
            }
        ],
        "totalIngresos":48000,
        "totalEgresos":21000
    }
]`;

const JSON_usuariosPredefinidos = `[
    { 
        "nombre":"coder",
        "contrasena":"house",
        "tipo":"super admin",
        "anioDeRegistro":2021
    }
]`;


/* ******************** CLASES DE LA APP ******************** */
class ControladorIndex {
    static ejecutar() {
        if(Usuario.estaLogeado()) {
            Navegador.redireccionar("pizarra.html");
        } else {
            // CARGANDO DATOS predefinidos en localStorage [Si ya existe NO agrega]
            Usuario.cargarJSON_usuariosPredefinidos();

            // REDUCIENDO velocidad de reproducción del video
            const $videoMarketing = document.querySelector('.video-marketing video');    
            if (ManejadorDOM.existeEnDOM($videoMarketing)) {
                Video.cambiarVelocidadDeReproduccion($videoMarketing, 0.5);
            }

            // ASOCIANDO EVENTOS -> A formularios del index.html
            const $formAcceso = document.getElementById('form-acceso');
            if (ManejadorDOM.existeEnDOM($formAcceso)) {
                $formAcceso.addEventListener('submit', ManejadorEventos.validarFormAcceso());
            }

            const $formRegistrarse = document.getElementById('form-registrarse');
            if (ManejadorDOM.existeEnDOM($formRegistrarse)) {
                $formRegistrarse.addEventListener('submit', ManejadorEventos.validarFormRegistrarse());    
            }
        }
    }
}

class ControladorPizarra {
    static ejecutar() {
        if(Usuario.estaLogeado()) {
            // CARGANDO DATOS predefinidos en localStorage [Si ya existe NO agrega]
            Pizarra.cargarJSON_pizarrasPredefinidas();

            // MOSTRANDO -> Nombre de usuario
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            ManejadorDOM.mostrarNombreDeUsuario(usuarioLogeado);
            
            // [Al abrir la app la pizarra seleccionada será por defecto la del mes actual]
            const $pizarraSeleccionada = document.getElementById('pizarra-seleccionada');
            if (ManejadorDOM.existeEnDOM($pizarraSeleccionada)) {
                // MOSTRANDO -> La pizarra selecionada
                const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

                const registrosDeItems = pizarra.crearRegistros();

                ManejadorDOM.mostrarNombrePizarra(pizarra);
                ManejadorDOM.agregar($pizarraSeleccionada, registrosDeItems);

                pizarra.actualizarInformacion();
                ManejadorDOM.mostrarInformacionPizarra(pizarra);

                // OBSERVANDO -> Cuando se agrega un nuevo item a la pizarra seleccionada
                const observador_nuevoItemAgregado = new MutationObserver(ManejadorEventos.actualizarInformacionPizarra());
                observador_nuevoItemAgregado.observe($pizarraSeleccionada, { childList: true, subtree: true });
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select categoría del formulario de agregar item
            const $selectCategoria = document.getElementById('agregar-item-select-categoria');
            if (ManejadorDOM.existeEnDOM($selectCategoria)) {
                const categorias = Categorias.get();
                const opcionesSelectCategoria = Formulario.crearOpcionesSelectCategoria(categorias);
                ManejadorDOM.agregar($selectCategoria, opcionesSelectCategoria);
            }

            // ASOCIANDO EVENTO -> A cada botón de radio del formulario de agregar item
            const $radiosTipoDeItem = document.querySelectorAll('input[name="agregar-item-radio-tipo"]');
            for (const $radio of $radiosTipoDeItem) {
                if (ManejadorDOM.existeEnDOM($radio)) {
                    $radio.addEventListener('change', ManejadorEventos.toggleDisplaySelectCategoria());
                }
            }

            // ASOCIANDO EVENTO -> A formulario de agregar item
            const $formAgregarItem = document.getElementById('form-agregar-item');
            if (ManejadorDOM.existeEnDOM($formAgregarItem)) {
                $formAgregarItem.addEventListener('submit', ManejadorEventos.validarFormAgregarItem());
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select año del formulario de configuración
            const $selectAnio = document.getElementById('configuracion-select-anio');
            if (ManejadorDOM.existeEnDOM($selectAnio)) {
                const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
                const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);
                ManejadorDOM.agregar($selectAnio, opcionesSelectAnio);
            }
            
            // ASOCIANDO EVENTO -> A formulario de configuración
            // ASOCIANDO EVENTO -> A barra lateral
            const $btnSalir = document.getElementById('btn-salir');
            if (ManejadorDOM.existeEnDOM($btnSalir)) {
                $btnSalir.addEventListener('click', ManejadorEventos.cerrarApp());
            }
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

class ControladorGrafico {
    static ejecutar() {
        if(Usuario.estaLogeado()) {
            // VEREMOS si lo programo o no
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

class ControladorCategorias {
    static ejecutar() {
        if(Usuario.estaLogeado()) {
            // CARGANDO DATOS predefinidos en localStorage [Si ya existe NO agrega]
            Pizarra.cargarJSON_pizarrasPredefinidas();
            
            // MOSTRANDO -> Nombre de usuario
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            ManejadorDOM.mostrarNombreDeUsuario(usuarioLogeado);
            
            //  CREANDO DINÁMICAMENTE -> Cards de categorías
            const $cardsCategorias = document.getElementById('contenedor-cards-categorias');
            if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
                const categorias = Categorias.get();
                const cardsCategorias = categorias.crearCards();
                ManejadorDOM.agregar($cardsCategorias, cardsCategorias);
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select año del formulario de configuración
            const $selectAnio = document.getElementById('configuracion-select-anio');
            if (ManejadorDOM.existeEnDOM($selectAnio)) {
                const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);
                ManejadorDOM.agregar($selectAnio, opcionesSelectAnio);
            }

            // ASOCIANDO EVENTO -> A formulario de configuración
            // ASOCIANDO EVENTO -> A barra lateral
            const $btnSalir = document.getElementById('btn-salir');
            if (ManejadorDOM.existeEnDOM($btnSalir)) {
                $btnSalir.addEventListener('click', ManejadorEventos.cerrarApp());
            }
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

class Usuario {
    constructor(nombre = null, contrasena = null, tipo = "invitado", anioDeRegistro = null, fechaSeleccionada = null) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.tipo = tipo;
        this.anioDeRegistro = anioDeRegistro;
        this.fechaSeleccionada = fechaSeleccionada;
    }

    static get() {
        if (Usuario.instancia instanceof Usuario) {
            return Usuario.instancia;
        }

        return Usuario.instancia = new Usuario();
    }

    // Métodos privados
    static validarUsuario(usuario) {
        if (Almacenamiento.existe("usuarios_registrados")) {
            function usuarioBuscado(elemento) {
                return elemento.nombre === usuario.nombre && elemento.contrasena === usuario.contrasena;
            }

            return Almacenamiento.buscar("usuarios_registrados", usuarioBuscado) ? true : false;
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

    setFechaSeleccionada(fecha) {
        this.fechaSeleccionada = fecha;
    }

    setTipoDeUsuario(tipo) {
        this.tipo = tipo;
    }

    static buscarUsuario(usuario) {
        if (Almacenamiento.existe("usuarios_registrados")) {            
            function nombreUsuarioBuscado(elemento) {
                return elemento.nombre === usuario.nombre;
            }

            return Almacenamiento.buscar("usuarios_registrados", nombreUsuarioBuscado);
        } else {
            return undefined;
        }
    }

    static cargarJSON_usuariosPredefinidos() {
        const usuariosPredefinidos = JSON.parse(JSON_usuariosPredefinidos);
        
        for (const usuario of usuariosPredefinidos) {
            if (! Usuario.existeUsuario(usuario)) {
                Usuario.guardarUsuario(usuario);
            }            
        }
    }

    static estaLogeado() {
        return Navegador.existeEnSesion("usuario_logeado");
    }

    static existeUsuario(usuario) {
        return Usuario.buscarUsuario(usuario) ? true : false;
    }

    static guardarUsuario(usuario) {
        Almacenamiento.guardar("usuarios_registrados", usuario);
    }

    static logearUsuario(usuario) {
        return Usuario.validarUsuario(usuario) ? true : false;
    }

    static cargarDatosAlmacenados(usuario) {
        const datosDeAlmacenamiento = Usuario.buscarUsuario(usuario);
        usuario.setTipoDeUsuario(datosDeAlmacenamiento.tipo);
        usuario.setAnioDeRegistro(datosDeAlmacenamiento.anioDeRegistro);
    }

    static obtenerUsuarioLogeado() {
        if (Navegador.existeEnSesion("usuario_logeado")) {
            const datosDeSesion = Navegador.obtenerDeSesion("usuario_logeado");
            
            const usuario = Usuario.get();
            usuario.setDatosDeUsuario(datosDeSesion.nombre, null);
            usuario.setAnioDeRegistro(datosDeSesion.anioDeRegistro);
            usuario.setFechaSeleccionada(datosDeSesion.fechaSeleccionada);

            return usuario;
        } else {
            return undefined;
        } 
    }
}

class Categoria {
    constructor(nombre, descripcion, icono) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.icono = icono;
    }

    static crearCard(nombre, descripcion, icono) {
        let $divColumna = document.createElement("div");
            $divColumna.classList.add('col', 's6', 'l4');
                        
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
        this.cargarJSON_categoriasPredefinidas();
    }

    static get() {
        if (Categorias.instancia instanceof Categorias) {
            return Categorias.instancia;
        }

        return Categorias.instancia = new Categorias();
    }
    
    // Métodos privados
    setCategoria(valor) {
        this.listado.push(valor);
    }

    cargarJSON_categoriasPredefinidas() {
        const categoriasPredefinidas = JSON.parse(JSON_categoriasPredefinidas);
        
        for (const categoria of categoriasPredefinidas) {
            const nuevaCategoria = new Categoria(categoria.nombre, categoria.descripcion, categoria.icono);
            this.setCategoria(nuevaCategoria);
        }
    }

    // Métodos públicos
    getListado() {
        return this.listado;
    }

    crearCards() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const categoria of this.getListado()) {
            let cardCategoria = Categoria.crearCard(categoria.nombre, categoria.descripcion, categoria.icono);
            ManejadorDOM.agregar(fragmento, cardCategoria);
        }

        return fragmento;
    }
}

class Pizarra {
    constructor(usuario) {
        this.usuario = usuario.nombre;
        this.fecha = usuario.fechaSeleccionada;
        this.items = [];
        this.totalIngresos = null;
        this.totalEgresos = null;
    }

    // Métodos privados
    static eliminarPizarras() {
        Almacenamiento.eliminar("pizarras");
    }

    static obtenerPizarras() {
        return Almacenamiento.obtener("pizarras");
    }

    // Métodos privados [Encargados de generar la información útil]
    filtrarItems(propiedad, valor) {
        return this.items.filter(elemento => elemento[propiedad] === valor);
    }

    obtenerItemsDeCategoria(categoriaDeItem) {
        return this.filtrarItems("categoria", categoriaDeItem);
    }

    obtenerItemsDeTipo(tipoDeItem) {
        return this.filtrarItems("tipo", tipoDeItem);
    }

    calcularTotal(coleccion) {
        return coleccion.reduce((a, b) => a + b.monto, 0);
    }

    calcularTotalIngresos() {
        this.totalIngresos = this.calcularTotal(this.obtenerItemsDeTipo("Ingreso"));
    }

    calcularTotalEgresos() {
        this.totalEgresos = this.calcularTotal( this.obtenerItemsDeTipo("Egreso"));
    }

    calcularBalance() {
        return this.totalIngresos - this.totalEgresos;
    }

    // Métodos públicos
    agregarItem(item) {
        this.items.push(item);
    }

    getItems() {
        return this.items;
    }

    getTotalEgresos() {
        return this.totalEgresos;
    }

    setItems(items) {
        this.items = items;
    }

    getTotalIngresos() {
        return this.totalIngresos;
    }

    static buscarPizarra(usuario, fecha) {
        if (Almacenamiento.existe("pizarras")) {
            function pizarraDeUsuarioBuscada(elemento) {
                return elemento.usuario === usuario && elemento.fecha === fecha;
            }

            return Almacenamiento.buscar("pizarras", pizarraDeUsuarioBuscada);
        } else {
            return undefined;
        }
    }

    static cargarJSON_pizarrasPredefinidas() {
        const pizarrasPredefinidas = JSON.parse(JSON_pizarrasPredefinidas);
        
        for (const pizarra of pizarrasPredefinidas) {
            if (! Pizarra.existePizarra(pizarra)) {
                Pizarra.guardarPizarra(pizarra);
            }
        }
    }

    static getIndice(pizarra, pizarras) {
        function pizarraDeUsuarioBuscada(elemento) {
            return elemento.usuario === pizarra.usuario && elemento.fecha === pizarra.fecha;
        }
        
        return pizarras.findIndex(pizarraDeUsuarioBuscada);
    }

    static existenteAgregarItem(pizarra, item) {
        let pizarrasAlmacenadas = Pizarra.obtenerPizarras();
        const indicePizarraDesactualizada = Pizarra.getIndice(pizarra, pizarrasAlmacenadas);
        Pizarra.eliminarPizarras();
        
        pizarra.agregarItem(item);

        // Reemplazo la pizarra desactualizada por la actualizada, dentro del conjunto de todas las pizarras
        pizarrasAlmacenadas.splice(indicePizarraDesactualizada, 1, pizarra);

        for (const pizarra of pizarrasAlmacenadas) {
            Pizarra.guardarPizarra(pizarra);
        }
    }

    static existenteEditarItem() {
        // Falta desarrollar
    }

    static existenteEliminarItem() {
        // Falta desarrollar
    }

    static existePizarra(pizarra) {
        return Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha) ? true : false;
    }

    static guardarPizarra(pizarra) {
        Almacenamiento.guardar("pizarras", pizarra);
    }

    actualizarInformacion() {
        this.calcularTotalIngresos();
        this.calcularTotalEgresos();
    }

    crearRegistros() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const item of this.getItems()) {
            let registroItem = Item.crearRegistro(item);
            ManejadorDOM.agregar(fragmento, registroItem);
        }    
        
        return fragmento;
    }

    static cargarDatosAlmacenados(pizarra) {
        const datosDeAlmacenamiento = Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha);
        pizarra.setItems(datosDeAlmacenamiento.items);
    }

    static obtenerPizarraDeUsuario(usuarioLogeado) {
        const pizarraDelUsuario = new Pizarra(usuarioLogeado);

        if (Pizarra.existePizarra(pizarraDelUsuario)) {
            Pizarra.cargarDatosAlmacenados(pizarraDelUsuario);
        }

        pizarraDelUsuario.actualizarInformacion();
        return pizarraDelUsuario;
    }
}

class Item {
    constructor(tipo, categoria, nombre, monto) {
        this.tipo = tipo;
        this.categoria = categoria;
        this.nombre = nombre;
        this.monto = monto;
    }

    static crearRegistro(item) {
        let $registroItem = document.createElement("tr");
        let estiloTipoDeItem;
        let iconoTipoDeItem;
        let estiloDeMonto;
    
        if(item.tipo === "Ingreso") {
            estiloTipoDeItem = "green-text";
            iconoTipoDeItem = "north_east";
            estiloDeMonto = "positivo";
            item.categoria = "----------";
        } else {
            estiloTipoDeItem = "red-text";
            iconoTipoDeItem = "south_west";
            estiloDeMonto = "negativo";
        }

        $registroItem.innerHTML  =  `<td>
                                        <i class="material-icons left ${estiloTipoDeItem} text-darken-2">${iconoTipoDeItem}</i>
                                    </td>
                                    <td>${item.categoria}</td>
                                    <td>${item.nombre}</td>
                                    <td>
                                        <a href="!#"><i class="btn-delete material-icons brown-text right">delete_forever</i></a>
                                        <a href="!#"><i class="btn-edit material-icons brown-text right">edit</i></a>
                                    </td>
                                    <td class="valor-${estiloDeMonto}">${Utilidades.formatearMonto(item.monto)}</td>`;
    
        return $registroItem;
    }
}

class DatosSesionDeUsuario {
    constructor(nombre, anioDeRegistro, fechaSeleccionada) {
        this.nombre = nombre;
        this.anioDeRegistro = anioDeRegistro;
        this.fechaSeleccionada = fechaSeleccionada;
    }
}


/* ******************** MI FRAMEWORK ******************** */
// Las clases Almacenamiento y Sesion trabajan con array de objetos
class App {
    static ejecutarControlador(controlador) {
        const codigoEjecutable = controlador + '.ejecutar()';
        const ejecutarControlador = new Function(codigoEjecutable);
        ejecutarControlador();
    }
}

class Ruteador {
    static rutas = JSON.parse(JSON_rutas).pop();

    static existe(pagina) {
        return Ruteador.rutas.hasOwnProperty(pagina);
    }

    static getControlador(pagina) {
        return Ruteador.rutas[pagina];
    }
}

class Almacenamiento {
    static buscar(clave, fn_busqueda) {
        const almacenado = Almacenamiento.obtener(clave);
        
        return almacenado.find(fn_busqueda);
    }

    static eliminar(clave) {
        localStorage.removeItem(clave);
    }

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

class Navegador {
    // Propiedad pública
    static paginaActual = location.pathname.split("/").pop();

    // Métodos públicos
    static cerrarSesion() {
        Sesion.eliminar("usuario_logeado");
    }

    static existeEnSesion(clave) {
        return Sesion.existe(clave);
    }

    static guardarEnSesion(clave, valor) {
        Sesion.guardar(clave, valor);
    }

    static iniciarSesion(datosDeSesion) {
        Sesion.guardar("usuario_logeado", datosDeSesion);
    }

    static obtenerDeSesion(clave) {
        return Sesion.obtener(clave).pop();
    }

    static redireccionar(ubicacion) {
        setTimeout( function() { location = ubicacion; }, 1000 );
    }

    static scrollear(ubicacion, tiempo = 0) {
        let posicion;
        switch (ubicacion) {
            case "final":
                posicion = document.body.scrollHeight;
                break;
            default:
                posicion = 0;
                break;
        }

        setTimeout( function() { window.scroll({
                top: posicion,
                behavior: "smooth"
            }); 
        }, tiempo );
    }
}

class Sesion {
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

class UtilidadesDOM {
    static agregar(contenedor, elemento) {
        contenedor.appendChild(elemento);
    }

    static crearFragmento() {
        return document.createDocumentFragment();
    }

    static limpiarTexto(contenedor) {
        contenedor.textContent = "";
    }

    static existeEnDOM(nodo) {
        return (nodo === document.body) ? false : document.body.contains(nodo);
    }

    static modificarTexto(selector, texto) {
        const $elemento = document.querySelector(selector);
        
        if (ManejadorDOM.existeEnDOM($elemento)) {
            $elemento.textContent = texto;
        }
    }

    static mostrarError(contenedor, msj) {
        contenedor.textContent = "ERROR -> " + msj;
        setTimeout( function() { ManejadorDOM.limpiarTexto(contenedor) }, 8000 );
    }

    static display(contenedor, valor = 'block') {
        contenedor.style.display = valor;
    }
}

class UtilidadesFormulario {
    static getInput(id) {
        const $input = document.getElementById(id);

        if (ManejadorDOM.existeEnDOM($input)) {
            return $input.value;
        }
    }

    static getOpcionDeSelectElegida(id) {
        const $select = document.getElementById(id);
        
        if (ManejadorDOM.existeEnDOM($select)) {
            const indiceSeleccionado = $select.selectedIndex;
            const opcionSeleccionada = $select.options[indiceSeleccionado].value;
            
            return opcionSeleccionada;
        }
    }

    static getRadioBtnElegido(name) {
        const $radioSeleccionado = document.querySelector(`input[name="${name}"]:checked`);
        
        if (ManejadorDOM.existeEnDOM($radioSeleccionado)) {
            const radioSeleccionado = $radioSeleccionado.value;
        
            return radioSeleccionado;
        }
    }
}

class Video {
    static cambiarVelocidadDeReproduccion(video, velocidad) {
        video.playbackRate = velocidad;
    } 
}

/* ******************** SERVICIOS ******************** */
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
    static anioActual = Fecha.hoy.getFullYear();
    static mesActual = Fecha.meses[Fecha.hoy.getMonth()];

    // Métodos públicos
    static getFecha() {
        return Utilidades.formatearFecha(Fecha.anio, Fecha.mes);
    }

    static getFechaActual() {
        return Utilidades.formatearFecha(Fecha.anioActual, Fecha.mesActual);
    }

    static setFecha(anio, mes) {
        Fecha.anio = anio;
        Fecha.mes = mes;
    }
}

class Formulario extends UtilidadesFormulario {
    // Métodos privados
    static crearOption(valor) {
        let $option = document.createElement("option");
            $option.setAttribute("value", valor);
                        
        $option.text  = valor;
    
        return $option;
    }

    // Métodos públicos
    static crearOpcionesSelectAnio(usuarioLogeado) {
        const fragmento = ManejadorDOM.crearFragmento();

        for (let anio = usuarioLogeado.anioDeRegistro; anio <= usuarioLogeado.anioDeRegistro + 3; anio++) {
            let optionDelSelect = Formulario.crearOption(anio);
            ManejadorDOM.agregar(fragmento, optionDelSelect);
        }

        return fragmento;
    }

    static crearOpcionesSelectCategoria(categorias) {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const categoria of categorias.getListado()) {
            let optionDelSelect = Formulario.crearOption(categoria.nombre);
            ManejadorDOM.agregar(fragmento, optionDelSelect);
        }

        return fragmento
    }
}

class ManejadorDOM extends UtilidadesDOM {
    static mostrarInformacionPizarra(pizarra) {
        ManejadorDOM.modificarTexto( '#total-de-items', pizarra.getItems().length );
        ManejadorDOM.modificarTexto( '#total-ingresos', Utilidades.formatearMonto(pizarra.getTotalIngresos()) );
        ManejadorDOM.modificarTexto( '#total-egresos', Utilidades.formatearMonto(pizarra.getTotalEgresos()) );
        ManejadorDOM.modificarTexto( '#balance', Utilidades.formatearMonto(pizarra.calcularBalance()) );
    }

    static mostrarNombreDeUsuario(usuario) {
        ManejadorDOM.modificarTexto( '#usuario-logeado', usuario.nombre );
    }

    static mostrarNombrePizarra(pizarra) {
        ManejadorDOM.modificarTexto( '#pizarra-nombre', pizarra.fecha );
    }
}

class ManejadorEventos {
    static cerrarApp() {
        return function(e) {
            e.preventDefault();
            Navegador.cerrarSesion();
            Navegador.redireccionar("index.html");
        }
    }

    static actualizarInformacionPizarra() {
        return function() {
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
            pizarra.actualizarInformacion();
            ManejadorDOM.mostrarInformacionPizarra(pizarra);
        }
    }

    static toggleDisplaySelectCategoria() {
        return function(e) {
            const $contenedorSelectCategoria = document.getElementById('contenedor-select-categoria');
            
            if (this.value === "Ingreso") {
                ManejadorDOM.display($contenedorSelectCategoria, 'none');
            } else {
                ManejadorDOM.display($contenedorSelectCategoria);
            }
            
        }
    }

    static validarFormAcceso() {
        return function(e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> Formulario acceso usuario
            const datoUsuario = Formulario.getInput('acceso-usuario').toLowerCase();
            const datoContrasena = Formulario.getInput('acceso-contrasena');
            
            // LÓGICA -> Acceso usuario
            const usuario = Usuario.get();
            usuario.setDatosDeUsuario(datoUsuario, datoContrasena);

            if (Usuario.logearUsuario(usuario)) {
                Usuario.cargarDatosAlmacenados(usuario);
                const datosDeSesion = new DatosSesionDeUsuario(usuario.nombre, usuario.anioDeRegistro, Fecha.getFechaActual());
                Navegador.iniciarSesion(datosDeSesion);
                formulario.reset();
                Navegador.redireccionar("pizarra.html");
            } else {
                const $error = document.getElementById('error-acceso')
                ManejadorDOM.mostrarError($error, "Datos de ingreso incorrectos");
                formulario.reset();
            }
        }
    }

    static validarFormAgregarItem() {
        return function(e) {
            e.preventDefault();
            const formulario = e.target;
            
            // OBTENIENDO DATOS -> formulario agregar item
            const datoNombre = Formulario.getInput('agregar-item-nombre');
            const datoTipo = Formulario.getRadioBtnElegido('agregar-item-radio-tipo');

            let datoCategoria = null;
            if (datoTipo === "Egreso") {
                datoCategoria = Formulario.getOpcionDeSelectElegida('agregar-item-select-categoria');
            }
            
            const datoMonto = parseFloat(Formulario.getInput('agregar-item-monto'));

            // LÓGICA -> Agregar item
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const nuevoItem = new Item(datoTipo, datoCategoria, datoNombre, datoMonto);
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            if (Pizarra.existePizarra(pizarra)) {
                Pizarra.existenteAgregarItem(pizarra, nuevoItem);
            } else {
                pizarra.agregarItem(nuevoItem);
                Pizarra.guardarPizarra(pizarra);
            }

            // MOSTRANDO -> El nuevo item al usuario
            const $pizarraSeleccionada = document.getElementById('pizarra-seleccionada');
            const registroItem = Item.crearRegistro(nuevoItem);
            ManejadorDOM.agregar($pizarraSeleccionada, registroItem);
                
            // OCULTO -> Select categoria
            const $contenedorSelectCategoria = document.getElementById('contenedor-select-categoria');
            ManejadorDOM.display($contenedorSelectCategoria, 'none');

            // Procedimiento de finalización
            formulario.reset();
            Modal.cerrar('modal-agregar-item');
            Navegador.scrollear("final");
            Navegador.scrollear("inicio", 3000);
        }   
    }

    static validarFormRegistrarse() {
        return function(e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> Formulario registrarse usuario
            const datoUsuario = Formulario.getInput('registrarse-usuario').toLowerCase();
            const datoContrasena = Formulario.getInput('registrarse-contrasena');

            // LÓGICA -> Registrarse usuario
            const usuario = Usuario.get();
            usuario.setDatosDeUsuario(datoUsuario, datoContrasena);

            if (! Usuario.existeUsuario(usuario)) {
                usuario.setTipoDeUsuario("registrado");
                usuario.setAnioDeRegistro(Fecha.anioActual);
                Usuario.guardarUsuario(usuario);
                
                const datosDeSesion = new DatosSesionDeUsuario(usuario.nombre, usuario.anioDeRegistro, Fecha.getFechaActual());
                Navegador.iniciarSesion(datosDeSesion);
                formulario.reset();
                Navegador.redireccionar("pizarra.html");
            } else {
                const $error = document.getElementById('error-registrarse')
                ManejadorDOM.mostrarError($error, "Nombre de usuario NO disponible");
                formulario.reset();
            }
        }
    }
}

class Modal {
    static cerrar(idModal) {
        const $modalAgregarItem = document.getElementById(idModal);
        const modal = M.Modal.getInstance($modalAgregarItem);
        modal.close();
    }
}

class Utilidades {
    static formatearFecha(anio, mes) {
        return `${anio} - ${mes}`;
    }
    
    static formatearMonto(monto) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });

        return formatter.format(monto);
    }

    static desformatearMonto(monto) {
        let montoDesformateado = monto.replace('$ ','');
        montoDesformateado = montoDesformateado.replace('.','');
        montoDesformateado = montoDesformateado.replace(',','.');

        return montoDesformateado;
    }
}