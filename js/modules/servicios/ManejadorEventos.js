import { Navegador, UtilidadesEvento } from '../igzframework.js';
import { Fecha, Formulario, ManejadorDOM, Modal, Tabla } from '../servicios.js';
import { DatosSesionDeUsuario, Item, Pizarra, Usuario } from '../clases.js';

class ManejadorEventos extends UtilidadesEvento {
    static getHandler_actualizarCambiosEnPizarra() {
        return function () {
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            ManejadorDOM.mostrarInformacionPizarra(pizarra);
        };
    }

    static getHandler_autocompletarFormConfiguracion() {
        return function () {
            // OBTENIENDO DATOS
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            Fecha.desformatearFecha(usuarioLogeado.fechaSeleccionada);

            // CARGANDO CAMPOS -> Formulario configuración
            Formulario.setOpcionDeSelect('#configuracion-select-anio', Fecha.getAnioSeleccionado());
            Formulario.setOpcionDeSelect('#configuracion-select-mes', Fecha.getMesSeleccionado());
            
            // Procedimiento de finalización
            M.AutoInit();
            M.updateTextFields();
        }
    }

    static getHandler_autocompletarFormEditarItem() {
        return function () {
            const $itemDisparador = $(this);
            const itemID = $itemDisparador.data('item-id');

            // OBTENIENDO DATOS
            const fila = Tabla.getFila($itemDisparador);
            const item = Tabla.getItem(fila, itemID);

            // OBTENIENDO DATOS -> Del item, a partir de su ID
            // Si existiera algún dato que NO pueda obtener del HTML visible, buscaría el item en localstorage para autocompletar:
            /* 
                const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
                const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
                const item = Item.getItem(itemID, pizarra.getItems());
            */
            
            // CARGANDO CAMPOS -> Formulario editar item
            Formulario.setInput('#editar-item-nombre', item.nombre);
            Formulario.setRadioBtn('editar-item-radio-tipo', item.tipo);
            Formulario.setOpcionDeSelect('#form-editar-item .select-categoria', item.categoria);
            Formulario.setInput('#editar-item-monto', item.monto);
            
            // MUESTRO u OCULTO -> El selector de categorias, dependiendo del tipo de item
            Formulario.toggleDisplaySelect('#form-editar-item .contenedor-select-categoria', item.tipo, { mostrar: "Egreso", ocultar: "Ingreso" });
            
            // ALMACENO DATO -> Guardo el ID y la fila del item dentro del formulario, para poder leerlo cuando se dispara su evento submit
            $('#form-editar-item').data('fila', fila);
            $('#form-editar-item').data('item-id', itemID);

            // Procedimiento de finalización
            M.AutoInit();
            M.updateTextFields();
        }
    }

    static getHandler_cerrarApp() {
        return function (e) {
            e.preventDefault();
            Navegador.cerrarSesion();
            Navegador.redireccionar("index.html");
        };
    }

    static getHandler_eliminarItem() {
        return function () {
            const $itemDisparador = $(this);

            const itemID = $itemDisparador.data('item-id');
            const fila = Tabla.getFila($itemDisparador);

            // LÓGICA -> Eliminar item
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            Pizarra.existenteEliminarItem(pizarra, itemID);
            ManejadorDOM.eliminarFila(fila);
        }
    }

    static getHandler_formAcceso() {
        return function (e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> Formulario acceso usuario
            const datoContrasena = Formulario.getInput('#acceso-contrasena');
            const datoUsuario = Formulario.getInput('#acceso-usuario').toLowerCase();

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
                ManejadorDOM.mostrarError('#error-acceso', "Datos de ingreso incorrectos");
                formulario.reset();
            }
        };
    }

    static getHandler_formAgregarItem() {
        return function (e) {
            e.preventDefault();

            // OBTENIENDO DATOS -> Formulario agregar item
            const datoNombre = Formulario.getInput('#agregar-item-nombre');
            const datoTipo = Formulario.getRadioBtnElegido('agregar-item-radio-tipo');

            let datoCategoria = null;
            if (datoTipo === "Egreso") {
                datoCategoria = Formulario.getOpcionDeSelectElegida('#form-agregar-item .select-categoria');
            }

            const datoMonto = parseFloat(Formulario.getInput('#agregar-item-monto'));

            // LÓGICA -> Agregar item
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
            const itemID = pizarra.getNuevoItemID();
            const itemNuevo = new Item(itemID, datoTipo, datoCategoria, datoNombre, datoMonto);

            if (Pizarra.existePizarra(pizarra)) {
                Pizarra.existenteAgregarItem(pizarra, itemNuevo);
            } else {
                pizarra.agregarItem(itemNuevo);
                pizarra.actualizarInformacion();
                Pizarra.guardarPizarra(pizarra);
            }

            // MOSTRANDO -> El nuevo item al usuario
            const $pizarraSeleccionada = $('#pizarra-seleccionada');
            const registroItem = Item.crearRegistro(itemNuevo);
            ManejadorDOM.agregar($pizarraSeleccionada, registroItem);

            // ASOCIANDO EVENTOS -> Al nuevo item
            ManejadorEventos.asociarAlUltimo('.btn-edit', 'click', ManejadorEventos.getHandler_autocompletarFormEditarItem());
            ManejadorEventos.asociarAlUltimo('.btn-delete', 'click', ManejadorEventos.getHandler_eliminarItem());

            // Procedimiento de finalización
            Modal.cerrar('modal-agregar-item');
            Navegador.scrollear("final");
            Navegador.scrollear("inicio", 3000);
        };
    }

    static getHandler_formConfiguracion() {
        return function (e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> Formulario configuración
            const datoAnio = Formulario.getOpcionDeSelectElegida('#configuracion-select-anio');
            const datoMes = Formulario.getOpcionDeSelectElegida('#configuracion-select-mes');

            // LÓGICA -> Configuración
            Fecha.setFecha(datoAnio, datoMes);

            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const datosDeSesion = new DatosSesionDeUsuario(usuarioLogeado.nombre, usuarioLogeado.anioDeRegistro, Fecha.getFecha());
            Navegador.actualizarEnSesion(datosDeSesion);

            // Procedimiento de finalización
            Modal.cerrar('modal-configuracion');
            Navegador.redireccionar("pizarra.html");
        }
    }

    static getHandler_formEditarItem() {
        return function (e) {
            e.preventDefault();

            const formulario = $(this);
            const itemID = formulario.data('item-id');
            const fila = formulario.data('fila');
            
            // OBTENIENDO DATOS -> Formulario editar item
            const datoNombre = Formulario.getInput('#editar-item-nombre');
            const datoTipo = Formulario.getRadioBtnElegido('editar-item-radio-tipo');

            let datoCategoria = null;
            if (datoTipo === "Egreso") {
                datoCategoria = Formulario.getOpcionDeSelectElegida('#form-editar-item .select-categoria');
            }

            const datoMonto = parseFloat(Formulario.getInput('#editar-item-monto'));

            // LÓGICA -> Editar item
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
            const itemModificado = new Item(itemID, datoTipo, datoCategoria, datoNombre, datoMonto);

            Pizarra.existenteEditarItem(pizarra, itemID, itemModificado);

            // MOSTRANDO -> El item modificado al usuario
            const registroItem = Item.crearRegistro(itemModificado);
            ManejadorDOM.reemplazar(fila, registroItem);

            /* FALTA PROGRAMAR :( -> Asociar evento solo al editado */
            ManejadorEventos.asociar('table .btn-edit', 'click', ManejadorEventos.getHandler_autocompletarFormEditarItem());
            ManejadorEventos.asociar('table .btn-delete', 'click', ManejadorEventos.getHandler_eliminarItem());
            
            // Procedimiento de finalización
            Modal.cerrar('modal-editar-item');
        };
    }

    static getHandler_formRegistrarse() {
        return function (e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> Formulario registrarse usuario
            const datoUsuario = Formulario.getInput('#registrarse-usuario').toLowerCase();
            const datoContrasena = Formulario.getInput('#registrarse-contrasena');

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
                Navegador.redireccionar("pizarra.html");
            } else {
                ManejadorDOM.mostrarError('#error-registrarse', "Nombre de usuario NO disponible");
                formulario.reset();
            }
        };
    }

    static getHandler_resetearFormAgregarItem() {
        return function () {
            Formulario.ocultarSelect('#form-agregar-item .contenedor-select-categoria');
            Formulario.reset('#form-agregar-item');
        }
    }

    static getHandler_reordenarTabla() {
        return function () {
            const $thDisparador = $(this);
            const indexColumna = $thDisparador.index();

            if (indexColumna !== 3) {
                let tabla = Tabla.getTabla($thDisparador);
                let filas = Tabla.getArrayDeFilas(tabla);

                filas.sort(Tabla.fn_comparacion(indexColumna));
                // GUARDO el orden de ordenamiento dentro del contexto, para cambiarlo cada vez que se ejecuta el manejador
                this.asc = !this.asc;
                if (!this.asc) {
                    filas = filas.reverse();
                }

                // RECARGO la tabla, con las filas ordenadas
                for (const fila of filas) {
                    ManejadorDOM.agregar(tabla, fila);
                }

                // MUESTRO icono de ordenamiento en la columna que disparó el evento
                Tabla.setIconoDeOrdenamiento($thDisparador, this.asc);
            }
        }
    }

    static getHandler_toggleDisplaySelectCategoria() {
        return function () {
            const $radioInputDisparador = $(this);
            const idFormulario = Formulario.getFormulario($radioInputDisparador).prop('id');
            
            Formulario.toggleDisplaySelect(`#${idFormulario} .contenedor-select-categoria`, this.value, { mostrar: "Egreso", ocultar: "Ingreso" });
        };
    }
}

export { ManejadorEventos };