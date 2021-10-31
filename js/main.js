document.addEventListener('DOMContentLoaded', init);

function init() {
    // CARGANDO DATOS predefinidos
    Usuario.cargarUsuariosPredefinidos();
    
    // INICIALIZO objetos globales de mi app
    const categorias = new Categorias();

    /* Controlador frontal básico */
    switch (Navegador.paginaActual()) {
        case "index.html":
                if(Usuario.estaLogeado()) {
                    Navegador.redireccionar("pizarra.html");
                } else {
                    this.usuario = new Usuario();

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
                if(Usuario.estaLogeado()) {
                    this.usuarioLogeado = Usuario.obtenerUsuarioLogeado();
                    Pizarra.cargarPizarrasPredefinidas();

                    /* MOSTRAR pizarra seleccionada [Al abrir la app será por defecto la del mes actual] */
                    const $pizarraSeleccionada = document.getElementById('pizarra-seleccionada');
                    if (ManejadorDOM.existeEnDOM($pizarraSeleccionada)) {
                        const pizarraMostrada = Pizarra.mostrarPizarra(this.usuarioLogeado, $pizarraSeleccionada);
                        Pizarra.mostrarInformacion(pizarraMostrada);
                    }

                     // CREANDO DINÁMICAMENTE opciones del select categoría del formulario de agregar item
                    const $selectCategoria = document.getElementById('agregar-item-select-categoria');
                    if (ManejadorDOM.existeEnDOM($selectCategoria)) {
                        const fragmento = ManejadorDOM.crearFragmento();

                        for (const categoria of categorias.getCategorias()) {
                            let optionDelSelect = Formulario.crearOption(categoria.nombre);
                            ManejadorDOM.agregar(fragmento, optionDelSelect);
                        }

                        ManejadorDOM.agregar($selectCategoria, fragmento);
                    }

                    // ASOCIANDO EVENTO a formulario de agregar item
                    const $formAgregarItem = document.getElementById('form-agregar-item');
                    if (ManejadorDOM.existeEnDOM($formAgregarItem)) {
                        $formAgregarItem.addEventListener('submit', ManejadorEventos.validarFormAgregarItem().bind(this));
                    }

                    // CREANDO DINÁMICAMENTE opciones del select año del formulario de configuración
                    const $selectAnio = document.getElementById('configuracion-select-anio');
                    if (ManejadorDOM.existeEnDOM($selectAnio)) {
                        const fragmento = ManejadorDOM.crearFragmento();

                        for (let anio = this.usuarioLogeado.anioDeRegistro; anio <= this.usuarioLogeado.anioDeRegistro + 3; anio++) {
                            let optionDelSelect = Formulario.crearOption(anio);
                            ManejadorDOM.agregar(fragmento, optionDelSelect);
                        }

                        ManejadorDOM.agregar($selectAnio, fragmento);
                    }
                    
                    // ASOCIANDO EVENTO a formulario de configuración
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
                if(Usuario.estaLogeado()) {
                       // VEREMOS si lo programo o no
                } else {
                    Navegador.redireccionar("index.html");
                }
            break;
        case "categorias.html":
                if(Usuario.estaLogeado()) {
                    //  CREANDO DINÁMICAMENTE cards de categorías
                    const $cardsCategorias = document.getElementById('contenedor-cards-categorias');
                    if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
                        const fragmento = ManejadorDOM.crearFragmento();

                        for (const categoria of categorias.getCategorias()) {
                            let cardCategoria = Categoria.crearCard(categoria.nombre, categoria.descripcion, categoria.icono);
                            ManejadorDOM.agregar(fragmento, cardCategoria);
                        }

                        ManejadorDOM.agregar($cardsCategorias, fragmento);
                    }


                    // CREANDO DINÁMICAMENTE opciones del select año del formulario de configuración
                    const $selectAnio = document.getElementById('configuracion-select-anio');
                    if (ManejadorDOM.existeEnDOM($selectAnio)) {
                        const fragmento = ManejadorDOM.crearFragmento();

                        for (let anio = this.usuarioLogeado.anioDeRegistro; anio <= this.usuarioLogeado.anioDeRegistro + 3; anio++) {
                            let optionDelSelect = Formulario.crearOption(anio);
                            ManejadorDOM.agregar(fragmento, optionDelSelect);
                        }

                        ManejadorDOM.agregar($selectAnio, fragmento);
                    }

                    
                    // ASOCIANDO EVENTO a formulario de configuración
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

/* ****************** ARCHIVOS JSON A CONSUMIR ****************** */
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

const JSON_pizarrasPredefinidas = `[
    { 
        "usuario":"coder",
        "fecha":"2021 - Octubre",
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
        "fecha":"2021 - Noviembre",
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
        this.cargarCategoriasPredefinidas();
    }

    // Métodos privados
    setCategoria(valor) {
        this.listado.push(valor);
    }

    cargarCategoriasPredefinidas() {
        const categoriasPredefinidas = JSON.parse(JSON_categoriasPredefinidas);
        
        for (const categoria of categoriasPredefinidas) {
            const nuevaCategoria = new Categoria(categoria.nombre, categoria.descripcion, categoria.icono);
            this.setCategoria(nuevaCategoria);
        }
    }

    // Métodos públicos
    getCategorias() {
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

    static cargarUsuariosPredefinidos() {
        const usuariosPredefinidos = JSON.parse(JSON_usuariosPredefinidos);
        
        for (const usuario of usuariosPredefinidos) {
            if (!Usuario.existeUsuario(usuario)) {
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

    logearUsuario() {
        return this.validarUsuario() ? true : false;
    }

    static obtenerUsuarioLogeado() {
        if (Sesion.existe("usuario_logeado")) {
            return Sesion.obtener("usuario_logeado").pop(); 
        } else {
            return undefined;
        } 
    }
}

class Pizarra {
    constructor(usuario, fecha) {
        this.usuario = usuario.nombre;
        this.fecha = fecha;
        this.items = [];
        this.totalIngresos = null;
        this.totalEgresos = null;
    }

    // Métodos privados
    static obtenerPizarras() {
        return Almacenamiento.obtener("pizarras");
    }

    static eliminarPizarras() {
        Almacenamiento.eliminar("pizarras");
    }

    // Métodos públicos
    agregarItem(item) {
        this.items.push(item);
    }

    setItems(items) {
        this.items = items;
    }

    getItems() {
        return this.items;
    }

    getTotalIngresos() {
        return this.totalIngresos;
    }

    getTotalEgresos() {
        return this.totalEgresos;
    }

    static buscarPizarra(usuario, fecha) {
        if (Almacenamiento.existe("pizarras")) {
            const pizarras = Almacenamiento.obtener("pizarras");
            
            function pizarraDeUsuarioBuscado(elemento) {
                return elemento.usuario === usuario && elemento.fecha === fecha;
            }

            return pizarras.find(pizarraDeUsuarioBuscado);
        } else {
            return undefined;
        }
    }

    static cargarPizarrasPredefinidas() {
        const pizarrasPredefinidas = JSON.parse(JSON_pizarrasPredefinidas);
        
        for (const pizarra of pizarrasPredefinidas) {
            if (!Pizarra.existePizarra(pizarra)) {
                Pizarra.guardarPizarra(pizarra);
            }
        }
    }

    static getIndice(usuario, fecha) {
        const pizarrasAlmacenadas = Pizarra.obtenerPizarras();

        function pizarraDeUsuarioBuscado(elemento) {
            return elemento.usuario === usuario && elemento.fecha === fecha;
        }

        return pizarrasAlmacenadas.findIndex(pizarraDeUsuarioBuscado);
    }

    static agregarItemPizarraExistente(pizarra, item) {
        let pizarrasAlmacenadas = Pizarra.obtenerPizarras();
        const indice = Pizarra.getIndice(pizarra.usuario, pizarra.fecha);
        Pizarra.eliminarPizarras();
        
        pizarra.items.push(item);
        pizarrasAlmacenadas.splice(indice, 1, pizarra);

        for (const pizarra of pizarrasAlmacenadas) {
            Pizarra.guardarPizarra(pizarra);
        }
    }

    static editarItemPizarraExistente() {
        // Falta desarrollar
    }

    static eliminarItemPizarraExistente() {
        // Falta desarrollar
    }

    static existePizarra(pizarra) {
        return Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha) ? true : false;
    }

    static guardarPizarra(pizarra) {
        Almacenamiento.guardar("pizarras", pizarra);
    }

    mostrarNombrePizarra(usuarioLogeado) {
        const $nombrePizarra = document.getElementById('pizarra-nombre');
        $nombrePizarra.textContent = usuarioLogeado.fechaSeleccionada;
    }

    static mostrarPizarra(usuarioLogeado, $pizarraSeleccionada) {
        const pizarra = new Pizarra(usuarioLogeado, usuarioLogeado.fechaSeleccionada);

        pizarra.mostrarNombrePizarra(usuarioLogeado);

        if (Pizarra.existePizarra(pizarra)) {
            const pizarraExistente = Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha);
            pizarra.setItems(pizarraExistente.items);

            const fragmento = ManejadorDOM.crearFragmento();

            for (const item of pizarra.getItems()) {
                let registroItem = Item.crearRegistro(item);
                ManejadorDOM.agregar(fragmento, registroItem);
            }
            ManejadorDOM.agregar($pizarraSeleccionada, fragmento);   
        } else {
            Pizarra.guardarPizarra(pizarra);
        }

        pizarra.actualizarInformacion();
        return pizarra;
    }

    obtenerItemsDeTipo(tipoDeItem) {
        return this.items.filter(elemento => elemento.tipo === tipoDeItem);
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

    actualizarInformacion() {
        this.calcularTotalIngresos();
        this.calcularTotalEgresos();
    }

    static mostrarInformacion(pizarra) {
        const $totalDeItems = document.getElementById('total-de-items');
        const $totalIngresos = document.getElementById('total-ingresos');
        const $totalEgresos = document.getElementById('total-egresos');
        const $balance = document.getElementById('balance');

        $totalDeItems.textContent = pizarra.getItems().length;
        $totalIngresos.textContent = Utilidades.formatearMonto(pizarra.getTotalIngresos());
        $totalEgresos.textContent = Utilidades.formatearMonto(pizarra.getTotalEgresos());
        $balance.textContent = Utilidades.formatearMonto(pizarra.calcularBalance());
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


/* ******************** SERVICIOS ******************** */
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

    static eliminar(clave) {
        localStorage.removeItem(clave);
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
        return function(e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS formulario acceso usuario
            const datoUsuario = document.getElementById('acceso-usuario').value;
            const datoContrasena = document.getElementById('acceso-contrasena').value;
            
            // LÓGICA acceso usuario
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

    static validarFormAgregarItem() {
        return function(e) {
            e.preventDefault();
            const formulario = e.target;
            
            // OBTENIENDO DATOS formulario agregar item
            const datoNombre = document.getElementById('agregar-item-nombre').value;
            
            const datoTipo = document.querySelector('input[name="agregar-item-radio-tipo"]:checked').value;
            
            const $selectCategoria = document.getElementById('agregar-item-select-categoria');
            const indiceSeleccionado = $selectCategoria.selectedIndex;
            const datoCategoria = $selectCategoria.options[indiceSeleccionado].value;

            const datoMonto = parseFloat(document.getElementById('agregar-item-monto').value);

            // LÓGICA agregar item
            const nuevoItem = new Item(datoTipo, datoCategoria, datoNombre, datoMonto);
            const pizarra = new Pizarra(this.usuarioLogeado, this.usuarioLogeado.fechaSeleccionada);

            if (Pizarra.existePizarra(pizarra)) {
                const pizarraExistente = Pizarra.buscarPizarra(pizarra.usuario, pizarra.fecha);
                pizarra.setItems(pizarraExistente.items);

                Pizarra.agregarItemPizarraExistente(pizarra, nuevoItem);
            } else {
                pizarra.agregarItem(nuevoItem);
                Pizarra.guardarPizarra(pizarra);
            }

            // AGREGO El nuevo elemento a la tabla
            const $pizarraSeleccionada = document.getElementById('pizarra-seleccionada');
            const registroItem = Item.crearRegistro(nuevoItem);
            ManejadorDOM.agregar($pizarraSeleccionada, registroItem);

            pizarra.actualizarInformacion();
            Pizarra.mostrarInformacion(pizarra);

            // OCULTO modal del framework
            Navegador.cerrarModal('modal-agregar-item');
            formulario.reset();
            Navegador.scrollear("final");
            Navegador.scrollear("inicio", 5000);
        }   
    }

    static validarFormRegistrarse() {
        return function(e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS formulario registrarse usuario
            const datoUsuario = document.getElementById('registrarse-usuario').value;
            const datoContrasena = document.getElementById('registrarse-contrasena').value;

            // LÓGICA registrarse usuario
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
    // Métodos públicos
    static cerrarModal(idModal) {
        const $modalAgregarItem = document.getElementById(idModal);
        const modal = M.Modal.getInstance($modalAgregarItem);
        modal.close();
    }

    static cerrarSesion() {
        Sesion.eliminar("usuario_logeado");
    }

    static existeEnSesion(clave) {
        return Sesion.existe(clave);
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

class Formulario {
    static crearOption(valor) {
        let $option = document.createElement("option");
            $option.setAttribute("value", valor);
                        
        $option.text  = valor;
    
        return $option;
    }
}

class Video {
    static cambiarVelocidadDeReproduccion(video, velocidad) {
        video.playbackRate = velocidad;
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

class Utilidades {
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