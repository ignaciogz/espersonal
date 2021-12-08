import { AppCache, ManejadorExcepcion, Navegador, SPA } from '../igzframework.js';
import { Fecha, ManejadorDOM, ManejadorEventos, Utilidades, Validador } from '../servicios.js';
import { Formulario, Item, Modal, Pizarra, Tabla, Usuario } from '../clases.js';
import { VistaItem } from '../vistas.js';

export function actualizarCambiosEnPizarra() {
    const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
    const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

    ManejadorDOM.mostrarInfoPizarra(pizarra);
}

export function actualizarSPA() {
    SPA.actualizar();
}


export function autocompletarFormConfiguracion() {
    try {
        // OBTENIENDO DATOS
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        Fecha.desformatearFecha(usuarioLogeado.fechaSeleccionada);

        // CARGANDO CAMPOS -> Formulario configuración
        Formulario.setOpcionDeSelect('configuracion-select-anio', Fecha.getAnio());
        Formulario.setOpcionDeSelect('configuracion-select-mes', Fecha.getMes());
            
        // Procedimiento de finalización
        M.AutoInit();
        M.updateTextFields();
    } catch(e) {
        ManejadorExcepcion.generarLOG(e);
    }
}


export function autocompletarFormEditarItem() {
    try {
        const formularioID = "#form-editar-item";
        const $itemDisparador = $(this);
        const itemID = $itemDisparador.data('item-id');
        
        // OBTENIENDO DATOS -> Del item, a partir del HTML visible
        const $fila = Tabla.getFila($itemDisparador);
        const item = Tabla.getItem($fila, itemID);

        // OBTENIENDO DATOS -> Del item, a partir de su ID
        // Si existiera algún dato que NO pueda obtener del HTML visible, 
        // buscaría el item en localstorage (DB de mi App) o en la cache, para autocompletar:
        /* 
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
            const item = Item.getItem(itemID, pizarra.getItems());
        */

        // CARGANDO CAMPOS -> Formulario editar item
        Formulario.setInput('editar-item-nombre', item.nombre);
        Formulario.setRadioBtn('editar-item-radio-tipo', item.tipo);
        if (item.categoria !== "Sin categoría") Formulario.setOpcionDeSelect('editar-item-select-categoria', item.categoria);
        Formulario.setInput('editar-item-monto', item.monto);

        // MUESTRO u OCULTO -> El selector de categorias, dependiendo del tipo de item
        Formulario.toggleDisplaySelect(`${formularioID} .contenedor-select-categoria`, item.tipo, {
            mostrar: "Egreso",
            ocultar: "Ingreso"
        });

        // ALMACENO DATO -> Guardo el ID y la fila del item dentro del formulario, para poder leerlo cuando se dispara su evento submit
        $(formularioID).data('fila', $fila);
        $(formularioID).data('item-id', itemID);

        // Procedimiento de finalización
        M.AutoInit();
        M.updateTextFields();
    } catch(e) {
        ManejadorExcepcion.generarLOG(e);
    }
}


export function cerrarApp(e) {
    e.preventDefault();
    Navegador.cerrarSesion();
    Navegador.redireccionar("index.html");
}

export function cerrarModal(e) {
    e.preventDefault();
}


export function eliminarItem() {
    const $itemDisparador = $(this);

    const itemID = $itemDisparador.data('item-id');
    const fila = Tabla.getFila($itemDisparador);

    // LÓGICA -> Eliminar item
    const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
    const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

    Pizarra.existenteEliminarItem(pizarra, itemID);
    ManejadorDOM.eliminarFila(fila);

    if(pizarra.estaVacia()) {
        setTimeout(() => ManejadorDOM.agregarInfoPizarraVacia(), 4000);
    }

    finishHandler_item(pizarra, 5000);
}


export function formAcceso(e) {
    try {
        e.preventDefault();
        const formulario = e.target;

        // OBTENIENDO DATOS -> Formulario acceso usuario
        const datoContrasena = Formulario.getInput('acceso-contrasena');
        const datoUsuario = Formulario.getInput('acceso-usuario').toLowerCase();

        // LÓGICA -> Acceso usuario
        const usuario = Usuario.get();
        usuario.setDatosDeUsuario(datoUsuario, datoContrasena);

        if (Validador.validarDatosDeUsuario(usuario)) {
            Usuario.cargarDatosAlmacenados(usuario);

            Usuario.logearUsuario(usuario);
            Navegador.redireccionar("app/index.html");
        } else {
            ManejadorDOM.mostrarError('#error-acceso', "Datos de ingreso incorrectos");
        }

        formulario.reset();
    } catch(e) {
        ManejadorExcepcion.generarLOG(e);
    }
}


export function formAgregarItem(e) {
    try {
        e.preventDefault();
        const formulario = e.target;
        const formularioID = `#${formulario.id}`;

        if (Validador.formularioEsValido(formularioID)) {
            // OBTENIENDO DATOS -> Formulario agregar item
            const datoNombre = Formulario.getInput('agregar-item-nombre');
            const datoTipo = Formulario.getRadioBtnElegido('agregar-item-radio-tipo');

            let datoCategoria = null;
            if (datoTipo === "Egreso") {
                datoCategoria = Formulario.getOpcionDeSelectElegida('agregar-item-select-categoria');
            }

            const datoMonto = Utilidades.parseNumero(Formulario.getInput('agregar-item-monto'));

            // LÓGICA -> Agregar item
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
            const itemID = pizarra.getNuevoItemID();
            const itemNuevo = new Item(itemID, datoTipo, datoCategoria, datoNombre, datoMonto);

            if (Pizarra.existePizarra(pizarra)) {
                Pizarra.existenteAgregarItem(pizarra, itemNuevo);
            } else {
                Pizarra.nuevaAgregarItem(pizarra, itemNuevo);
            }

            if(!pizarra.estaVacia()) {
                ManejadorDOM.quitarInfoPizarraVacia();
            }
            // FIN LÓGICA -> Agregar item

            Modal.cerrar('modal-agregar-item');
            Navegador.scrollear("final");

            // MOSTRANDO -> El nuevo item al usuario
            const $pizarraSeleccionada = $('#pizarra-seleccionada');
            const registroItem = VistaItem.crearRegistro(itemNuevo);
            ManejadorDOM.agregarFila($pizarraSeleccionada, registroItem);

            // ASOCIANDO EVENTOS -> Al nuevo item
            ManejadorEventos.asociarAlUltimo('.btn-edit', 'click', ManejadorEventos.getHandler("autocompletarFormEditarItem"));
            ManejadorEventos.asociarAlUltimo('.btn-delete', 'click', ManejadorEventos.getHandler("eliminarItem"));

            finishHandler_item(pizarra, 4000);
        }
    } catch(e) {
        ManejadorExcepcion.generarLOG(e);
    }
}


export function formConfiguracion(e) {
    try {
        e.preventDefault();

        // OBTENIENDO DATOS -> Formulario configuración
        const datoAnio = Formulario.getOpcionDeSelectElegida('configuracion-select-anio');
        const datoMes = Formulario.getOpcionDeSelectElegida('configuracion-select-mes');

        // LÓGICA -> Configuración
        Fecha.setFecha(datoAnio, datoMes);

        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        Usuario.actualizarFechaSeleccionada(usuarioLogeado, Fecha.getFecha());

        // Procedimiento de finalización
        Modal.cerrar('modal-configuracion');
        AppCache.limpiar();
        actualizarSPA();
    } catch(e) {
        ManejadorExcepcion.generarLOG(e);
    }
}


export function formEditarItem(e) {
    try {
        e.preventDefault();
        const formulario = e.target;
        const formularioID = `#${formulario.id}`;

        if (Validador.formularioEsValido(formularioID)) {
            const itemID = $(formularioID).data('item-id');
            const $fila = $(formularioID).data('fila');

            // OBTENIENDO DATOS -> Formulario editar item
            const datoNombre = Formulario.getInput('editar-item-nombre');
            const datoTipo = Formulario.getRadioBtnElegido('editar-item-radio-tipo');

            let datoCategoria = null;
            if (datoTipo === "Egreso") {
                datoCategoria = Formulario.getOpcionDeSelectElegida('editar-item-select-categoria');
            }

            const datoMonto = Utilidades.parseNumero(Formulario.getInput('editar-item-monto'));

            // LÓGICA -> Editar item
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
            const itemModificado = new Item(itemID, datoTipo, datoCategoria, datoNombre, datoMonto);

            Pizarra.existenteEditarItem(pizarra, itemID, itemModificado);
            // FIN LÓGICA -> Editar item

            Modal.cerrar('modal-editar-item');

            // MOSTRANDO -> El item modificado al usuario
            const registroItemModificado = VistaItem.crearRegistro(itemModificado);
            ManejadorDOM.reemplazarFila($fila, registroItemModificado);

            ManejadorEventos.asociarAlSubElemento(registroItemModificado, '.btn-edit', 'click', ManejadorEventos.getHandler("autocompletarFormEditarItem"));
            ManejadorEventos.asociarAlSubElemento(registroItemModificado, '.btn-delete', 'click', ManejadorEventos.getHandler("eliminarItem"));

            finishHandler_item(pizarra, 4000);
        }
    } catch(e) {
        ManejadorExcepcion.generarLOG(e);
    }
}


export function formRegistrarse(e) {
    try {
        e.preventDefault();
        const formulario = e.target;

        // OBTENIENDO DATOS -> Formulario registrarse usuario
        const datoUsuario = Formulario.getInput('registrarse-usuario').toLowerCase();
        const datoContrasena = Formulario.getInput('registrarse-contrasena');

        // LÓGICA -> Registrarse usuario
        const usuario = Usuario.get();
        usuario.setDatosDeUsuario(datoUsuario, datoContrasena);

        if (!Validador.validarExistenciaDeUsuario(usuario)) {
            usuario.setTipoDeUsuario("registrado");
            usuario.setAnioDeRegistro(Fecha.anioActual);
            
            Usuario.guardarUsuario(usuario);

            Usuario.logearUsuario(usuario);
            Navegador.redireccionar("app/index.html");
        } else {
            ManejadorDOM.mostrarError('#error-registrarse', "Nombre de usuario NO disponible");
        }

        formulario.reset();
    } catch(e) {
        ManejadorExcepcion.generarLOG(e);
    }
}


export function reordenarTabla() {
    const $thDisparador = $(this);
    const indexColumna = $thDisparador.index();

    if (indexColumna !== 3) {
        let $tabla = Tabla.getTabla($thDisparador);
        let filas = Tabla.getArrayDeFilas($tabla);

        filas.sort(Tabla.fn_comparacion(indexColumna));
        // GUARDO el orden de ordenamiento dentro del contexto, para cambiarlo cada vez que se ejecuta el manejador
        this.asc = !this.asc;
        if (!this.asc) {
            filas = filas.reverse();
        }

        // RECARGO la tabla, con las filas ordenadas
        for (const fila of filas) {
            ManejadorDOM.agregar($tabla, fila);
        }

        // MUESTRO icono de ordenamiento en la columna que disparó el evento
        ManejadorDOM.mostrarIconoDeOrdenamiento($thDisparador, this.asc);
    }
}


export function resetearFormAgregarItem() {
    const formularioID = '#form-agregar-item';
    Formulario.inicializar(formularioID);   
}


export function resetearFormEditarItem() {
    const formularioID = '#form-editar-item';
    Formulario.inicializar(formularioID);
}


export function toggleDisplaySelectCategoria() {
    const formularioID = Formulario.getFormularioIDdelInput(this);
    Formulario.toggleDisplaySelect(`${formularioID} .contenedor-select-categoria`, this.value, {
        mostrar: "Egreso",
        ocultar: "Ingreso"
    });
}


export function validarCampo() {
    const formularioID = Formulario.getFormularioIDdelInput(this);
    const patronDelCampo = this.pattern || this.dataset.pattern;
    let campoValido = null;

    if(patronDelCampo && this.value) {
        // Cuando tiene atributo o data pattern. Y el campo NO se encuentra vacio
        const regex = new RegExp(patronDelCampo);
        campoValido = regex.test(this.value);
    }
    else if (!patronDelCampo) {
        // Cuando NO tiene atributo o data pattern 
        campoValido = this.value !== "";
    }

    Formulario.toggleDisplayFormError(`#error-${this.id}`, campoValido);
    
    // ALMACENO DATO -> Guardo si el input actual pasó la validación o NO, dentro del formulario. Para poder leerlo en el método: formularioEsValido
    $(formularioID).data(`campo-valido-${this.id}`, campoValido);
}


function finishHandler_item(pizarra, tiempoDeScroll) {
    AppCache.actualizar("pizarra_seleccionada", pizarra);
    AppCache.eliminar("grafico_informacion");
    Navegador.scrollear("inicio", tiempoDeScroll);
}