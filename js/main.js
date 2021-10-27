document.addEventListener('DOMContentLoaded', init);

function init() {
    /* Inicializo componentes del framework */
    M.AutoInit();

    /* Inicializo objetos globales de mi app */
    const manejadorDOM = new ManejadorDOM();
    const manejadorEventos = new ManejadorEventos();
    const categorias = new Categorias();
    const usuario = new Usuario();

    /* Controlador frontal basico */
    const paginaActual = location.pathname.split("/").pop();
    switch (paginaActual) {
        case "index.html": 
                // Reduciendo velocidad de reproducción del video
                const $videoMarketing = document.querySelector('.video-marketing video');    
                if (manejadorDOM.existeEnDOM($videoMarketing)) {
                    $videoMarketing.playbackRate = 0.5;
                }

                // Asociando eventos a formularios
                const $formAcceso = document.getElementById('form-acceso');
                if (manejadorDOM.existeEnDOM($formAcceso)) {
                    $formAcceso.addEventListener('submit', manejadorEventos.validarFormAcceso(usuario));
                }
            break;
        case "pizarra.html":
            break;
        case "grafico.html":
            break;
        case "categorias.html":
                // Mostrando categorias
                const $cardsCategorias = document.getElementById('contenedor-cards-categorias');
                const fragmento = manejadorDOM.crearFragmento();

                if (manejadorDOM.existeEnDOM($cardsCategorias)) {
                    for (const categoria of categorias.obtenerCategorias()) {
                        let cardCategoria = manejadorDOM.crearCardCategoriaLiteral(categoria.nombre, categoria.descripcion, categoria.icono);
                        // let cardCategoria = manejadorDOM.crearCardCategoria(categoria.nombre, categoria.descripcion, categoria.icono);
                        manejadorDOM.agregar(fragmento, cardCategoria);
                    }
                    manejadorDOM.agregar($cardsCategorias, fragmento);
                }
            break;
    }
}


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
        this.listado.push(new Categoria("Comida", "Descripcion - Categoria Comida", "fastfood"));
        this.listado.push(new Categoria("Deportes", "Descripcion - Categoria Deportes", "sports_handball"));
        this.listado.push(new Categoria("Deudas", "Descripcion - Categoria Deudas", "receipt"));
        this.listado.push(new Categoria("Entretenimiento", "Descripcion - Categoria Entretenimiento", "celebration"));
        this.listado.push(new Categoria("Facturas", "Descripcion - Categoria Factura", "receipt_long"));
        this.listado.push(new Categoria("Gimnasio", "Descripcion - Categoria Gimnasio", "fitness_center"));
        this.listado.push(new Categoria("Hogar", "Descripcion - Categoria Hogar", "home"));
        this.listado.push(new Categoria("Mascotas", "Descripcion - Categoria Mascotas", "pets"));
        this.listado.push(new Categoria("Regalos", "Descripcion - Categoria Regalos", "card_giftcard"));
        this.listado.push(new Categoria("Restaurantes", "Descripcion - Categoria Restaurantes", "restaurant"));
        this.listado.push(new Categoria("Ropa", "Descripcion - Categoria Ropa", "shopping_bag"));
        this.listado.push(new Categoria("Salud", "Descripcion - Categoria Salud", "health_and_safety"));
        this.listado.push(new Categoria("Tarjeta de crédito", "Descripcion - Categoria Tarjeta de credito", "credit_card"));
        this.listado.push(new Categoria("Transporte", "Descripcion - Categoria Transporte", "commute"));
    }

    // Métodos públicos
    existeCategoria(nombreDeCategoria) {
        return this.listado.filter(elemento => elemento.nombre === nombreDeCategoria).length > 0 ? true : false;
    }

    obtenerCategoria(nombreDeCategoria) {
        return this.listado.filter(elemento => elemento.nombre === nombreDeCategoria).pop();
    }

    obtenerCategorias() {
        return this.listado;
    }
}

class Usuario {
    constructor() {
        this.nombre = "visitante";
        this.nombreDeUsuario = null;
        this.contrasenaDeUsuario = null;
        this.tipo = "invitado";
    }

    // Metodos privados
    validarUsuario() {
        return this.verificarNombreDeUsuario() && this.verificarContrasenaDeUsuario();
    }

    verificarNombreDeUsuario() {
        return (this.nombreDeUsuario != "") && (this.nombreDeUsuario== "coder");
    }
    verificarContrasenaDeUsuario() {
        return (this.contrasenaDeUsuario != "") && (this.contrasenaDeUsuario == "house");
    }

    // Metodos publicos
    logearUsuario() {
        if(this.validarUsuario()) {
            this.nombre = this.nombreDeUsuario;
            this.contrasena = null;
            this.tipo = "registrado";

            return true;
        } else {
            return false;
        }
    }

    solicitarDatosDeUsuario(datoUsuario, datoContrasena) {
        this.nombreDeUsuario = datoUsuario;
        this.contrasenaDeUsuario = datoContrasena;
    }
}

class ManejadorDOM {
    crearCardCategoria(nombre, descripcion, icono) {
        let $divColumna = document.createElement("div");
            $divColumna.classList.add('col', 's6', 'm4');
    
        let $cardH2 = document.createElement("h2");
            $cardH2.classList.add('card-header');
            $cardH2.innerHTML = nombre;
    
        let $divCardHorizontal = document.createElement("div");
            $divCardHorizontal.classList.add('card', 'horizontal');
    
            let $divCardIcono = document.createElement("div");
                $divCardIcono.classList.add('card-image');
            
                let $icono = document.createElement("i");
                    $icono.classList.add('medium', 'material-icons', 'right');
                    $icono.innerHTML = icono;
                
            $divCardIcono.appendChild($icono);
    
            let $divCardPila = document.createElement("div");
                $divCardPila.classList.add('card-stacked');
    
                let $divCardContenido = document.createElement("div");
                    $divCardContenido.classList.add('card-content');
    
                    let $cardDescripcion = document.createElement("p");
                        $cardDescripcion.innerHTML = descripcion;
        
                $divCardContenido.appendChild($cardDescripcion);
            $divCardPila.appendChild($divCardContenido);
        
        $divCardHorizontal.appendChild($divCardIcono);
        $divCardHorizontal.appendChild($divCardPila);
    
        $divColumna.appendChild($cardH2);
        $divColumna.appendChild($divCardHorizontal);
        return $divColumna;
    }
    
    crearCardCategoriaLiteral(nombre, descripcion, icono) {
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

    crearFragmento() {
        return document.createDocumentFragment();
    }

    existeEnDOM(nodo) {
        return (nodo === document.body) ? false : document.body.contains(nodo);
    }

    agregar(contenedor, elemento) {
        contenedor.appendChild(elemento);
    }
}

class ManejadorEventos {
    validarFormAcceso(usuario) {
        return function (e) {
            e.preventDefault();
            const formulario = e.target;

            const datoUsuario = formulario.accesoUsuario.value;
            const datoContrasena = formulario.accesoContrasena.value;
            
            usuario.solicitarDatosDeUsuario(datoUsuario, datoContrasena);
            if (usuario.logearUsuario()) {
                alert("Bienvenido ! " + usuario.nombre);
                this.reset();
                setTimeout( function() { location = "pizarra.html"; }, 1000 );
            } else {
                alert("Error:\nDatos de ingreso incorrectos");
                this.reset();
            }
        }
    }
}