import { AppCache, Navegador, UtilidadesEvento } from '../igzframework.js';
import { Fecha, ManejadorDOM, Modal } from '../servicios.js';
import { DatosSesionDeUsuario, Formulario, Item, Pizarra, Tabla, Usuario } from '../modelos.js';
import { VistaItem } from '../vistas.js';

class ManejadorEventos extends UtilidadesEvento {
    static getHandler_actualizarCambiosEnPizarra() {
        return function handler_actualizarCambiosEnPizarra() {
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            ManejadorDOM.mostrarInformacionPizarra(pizarra);
        };
    }

    static getHandler_autocompletarFormConfiguracion() {
        return function handler_autocompletarFormConfiguracion() {
            // OBTENIENDO DATOS
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            Fecha.desformatearFecha(usuarioLogeado.fechaSeleccionada);

            // CARGANDO CAMPOS -> Formulario configuración
            Formulario.setOpcionDeSelect('configuracion-select-anio', Fecha.getAnio());
            Formulario.setOpcionDeSelect('configuracion-select-mes', Fecha.getMes());
            
            // Procedimiento de finalización
            M.AutoInit();
            M.updateTextFields();
        };
    }

    static getHandler_autocompletarFormEditarItem() {
        return function handler_autocompletarFormEditarItem() {
            const $itemDisparador = $(this);
            const itemID = $itemDisparador.data('item-id');
            const formularioID = "#form-editar-item";

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
            Formulario.setOpcionDeSelect('editar-select-categoria', item.categoria);
            Formulario.setInput('editar-item-monto', item.monto);
            
            // MUESTRO u OCULTO -> El selector de categorias, dependiendo del tipo de item
            Formulario.toggleDisplaySelect(`${formularioID} .contenedor-select-categoria`, item.tipo, { mostrar: "Egreso", ocultar: "Ingreso" });
            
            // ALMACENO DATO -> Guardo el ID y la fila del item dentro del formulario, para poder leerlo cuando se dispara su evento submit
            $(formularioID).data('fila', $fila);
            $(formularioID).data('item-id', itemID);

            // Procedimiento de finalización
            M.AutoInit();
            M.updateTextFields();
        };
    }

    static getHandler_cerrarApp() {
        return function handler_cerrarApp() {
            Navegador.cerrarSesion();
            Navegador.redireccionar("index.html");
        };
    }

    static getHandler_eliminarItem() {
        return function handler_eliminarItem() {
            const $itemDisparador = $(this);

            const itemID = $itemDisparador.data('item-id');
            const fila = Tabla.getFila($itemDisparador);

            // LÓGICA -> Eliminar item
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            Pizarra.existenteEliminarItem(pizarra, itemID);
            ManejadorDOM.eliminarFila(fila);

            AppCache.actualizar("pizarra_seleccionada", pizarra);
            Navegador.scrollear("inicio", 5000);
        };
    }

    static getHandler_formAcceso() {
        return function handler_formAcceso(e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> Formulario acceso usuario
            const datoContrasena = Formulario.getInput('acceso-contrasena');
            const datoUsuario = Formulario.getInput('acceso-usuario').toLowerCase();

            // LÓGICA -> Acceso usuario
            const usuario = Usuario.get();
            usuario.setDatosDeUsuario(datoUsuario, datoContrasena);

            if (Usuario.logearUsuario(usuario)) {
                Usuario.cargarDatosAlmacenados(usuario);
                const datosDeSesion = new DatosSesionDeUsuario(usuario.nombre, usuario.anioDeRegistro, Fecha.getFechaActual());
                Navegador.iniciarSesion(datosDeSesion);
                formulario.reset();
                Navegador.redireccionar("app/pizarra.html");
            } else {
                ManejadorDOM.mostrarError('#error-acceso', "Datos de ingreso incorrectos");
                formulario.reset();
            }
        };
    }

    static getHandler_formAgregarItem() {
        return function handler_formAgregarItem(e) {
            e.preventDefault();

            // OBTENIENDO DATOS -> Formulario agregar item
            const datoNombre = Formulario.getInput('agregar-item-nombre');
            const datoTipo = Formulario.getRadioBtnElegido('agregar-item-radio-tipo');

            let datoCategoria = null;
            if (datoTipo === "Egreso") {
                datoCategoria = Formulario.getOpcionDeSelectElegida('agregar-select-categoria');
            }

            const datoMonto = parseFloat(Formulario.getInput('agregar-item-monto'));

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
            // FIN LÓGICA -> Agregar item

            Modal.cerrar('modal-agregar-item');
            Navegador.scrollear("final");

            // MOSTRANDO -> El nuevo item al usuario
            const $pizarraSeleccionada = $('#pizarra-seleccionada');
            const registroItem = VistaItem.crearRegistro(itemNuevo);
            ManejadorDOM.agregarFila($pizarraSeleccionada, registroItem);

            // ASOCIANDO EVENTOS -> Al nuevo item
            ManejadorEventos.asociarAlUltimo('.btn-edit', 'click', ManejadorEventos.getHandler_autocompletarFormEditarItem());
            ManejadorEventos.asociarAlUltimo('.btn-delete', 'click', ManejadorEventos.getHandler_eliminarItem());

            AppCache.actualizar("pizarra_seleccionada", pizarra);
            Navegador.scrollear("inicio", 4000);
        };
    }

    static getHandler_formConfiguracion() {
        return function handler_formConfiguracion(e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> Formulario configuración
            const datoAnio = Formulario.getOpcionDeSelectElegida('configuracion-select-anio');
            const datoMes = Formulario.getOpcionDeSelectElegida('configuracion-select-mes');

            // LÓGICA -> Configuración
            Fecha.setFecha(datoAnio, datoMes);

            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const datosDeSesion = new DatosSesionDeUsuario(usuarioLogeado.nombre, usuarioLogeado.anioDeRegistro, Fecha.getFecha());
            Navegador.actualizarEnSesion(datosDeSesion);

            // Procedimiento de finalización
            Modal.cerrar('modal-configuracion');
            AppCache.eliminar("pizarra_seleccionada");
            Navegador.redireccionar("app/pizarra.html");
        };
    }

    static getHandler_formEditarItem() {
        return function handler_formEditarItem(e) {
            e.preventDefault();

            const formulario = $(this);
            const itemID = formulario.data('item-id');
            const $fila = formulario.data('fila');
            
            // OBTENIENDO DATOS -> Formulario editar item
            const datoNombre = Formulario.getInput('editar-item-nombre');
            const datoTipo = Formulario.getRadioBtnElegido('editar-item-radio-tipo');

            let datoCategoria = null;
            if (datoTipo === "Egreso") {
                datoCategoria = Formulario.getOpcionDeSelectElegida('editar-select-categoria');
            }

            const datoMonto = parseFloat(Formulario.getInput('editar-item-monto'));

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

            /* FALTA PROGRAMAR :( -> Asociar evento solo al editado */
            ManejadorEventos.asociarAlSubElemento(registroItemModificado, '.btn-edit', 'click', ManejadorEventos.getHandler_autocompletarFormEditarItem());
            ManejadorEventos.asociarAlSubElemento(registroItemModificado, '.btn-delete', 'click', ManejadorEventos.getHandler_eliminarItem());

            AppCache.actualizar("pizarra_seleccionada", pizarra);
            Navegador.scrollear("inicio", 4000);
        };
    }

    static getHandler_formRegistrarse() {
        return function handler_formRegistrarse(e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> Formulario registrarse usuario
            const datoUsuario = Formulario.getInput('registrarse-usuario').toLowerCase();
            const datoContrasena = Formulario.getInput('registrarse-contrasena');

            // LÓGICA -> Registrarse usuario
            const usuario = Usuario.get();
            usuario.setDatosDeUsuario(datoUsuario, datoContrasena);

            if (!Usuario.existeUsuario(usuario)) {
                usuario.setTipoDeUsuario("registrado");
                usuario.setAnioDeRegistro(Fecha.anioActual);
                Usuario.guardarUsuario(usuario);

                const datosDeSesion = new DatosSesionDeUsuario(usuario.nombre, usuario.anioDeRegistro, Fecha.getFechaActual());
                Navegador.iniciarSesion(datosDeSesion);
                formulario.reset();
                Navegador.redireccionar("app/pizarra.html");
            } else {
                ManejadorDOM.mostrarError('#error-registrarse', "Nombre de usuario NO disponible");
                formulario.reset();
            }
        };
    }

    static getHandler_reordenarTabla() {
        return function handler_reordenarTabla() {
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
        };
    }

    static getHandler_resetearFormAgregarItem() {
        return function handler_resetearFormAgregarItem() {
            Formulario.ocultarSelect('#form-agregar-item .contenedor-select-categoria');
            Formulario.reset('#form-agregar-item');
        };
    }

    static getHandler_toggleDisplaySelectCategoria() {
        return function handler_toggleDisplaySelectCategoria() {
            const $radioInputDisparador = $(this);
            const idFormulario = Formulario.getFormulario($radioInputDisparador).prop('id');
            
            Formulario.toggleDisplaySelect(`#${idFormulario} .contenedor-select-categoria`, this.value, { mostrar: "Egreso", ocultar: "Ingreso" });
        };
    }
}

export { ManejadorEventos };