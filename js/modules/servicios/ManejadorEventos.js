import { Navegador, UtilidadesEvento } from '../igzframework.js';
import { Fecha, Formulario, ManejadorDOM, Modal, Tabla } from '../servicios.js';
import { DatosSesionDeUsuario, Item, Pizarra, Usuario } from '../clases.js';

class ManejadorEventos extends UtilidadesEvento {
    static getActualizarCambiosEnPizarra() {
        return function ActualizarCambiosEnPizarra() {
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            pizarra.actualizarInformacion();
            ManejadorDOM.mostrarInformacionPizarra(pizarra);

            // ASOCIANDO EVENTOS
            ManejadorEventos.asociar('.btn-edit', 'click', ManejadorEventos.getEditarItem());
            ManejadorEventos.asociar('.btn-delete', 'click', ManejadorEventos.getEliminarItem());
        };
    }

    static getCerrarApp() {
        return function cerrarApp(e) {
            e.preventDefault();
            Navegador.cerrarSesion();
            Navegador.redireccionar("index.html");
        };
    }

    static getEditarItem() {
        return function editarItem(e) {
            e.preventDefault();
            const itemID = this.getAttribute('data-item-id');
            
            console.log(`Editaremos el ID ${itemID}`);
        }
    }

    static getEliminarItem() {
        return function eliminarItem(e) {
            e.preventDefault();
            const itemID = this.getAttribute('data-item-id');

            console.log(`Eliminaremos el ID ${itemID}`);
        }
    }

    static getReordenarTabla() {
        return function reordenarTabla() {
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

    static getToggleDisplaySelectCategoria() {
        return function toggleDisplaySelectCategoria(e) {
            const $contenedorSelectCategoria = $('#contenedor-select-categoria');
            
            if (this.value === "Ingreso") {
                $contenedorSelectCategoria.hide();
            } 

            if (this.value === "Egreso") {
                $contenedorSelectCategoria.show();
            }
        };
    }

    static getValidarFormAcceso() {
        return function validarFormAcceso(e) {
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

    static getValidarFormAgregarItem() {
        return function validarFormAgregarItem(e) {
            e.preventDefault();
            const formulario = e.target;

            // OBTENIENDO DATOS -> formulario agregar item
            const datoNombre = Formulario.getInput('#agregar-item-nombre');
            const datoTipo = Formulario.getRadioBtnElegido('agregar-item-radio-tipo');

            let datoCategoria = null;
            if (datoTipo === "Egreso") {
                datoCategoria = Formulario.getOpcionDeSelectElegida('#agregar-item-select-categoria');
            }

            const datoMonto = parseFloat(Formulario.getInput('#agregar-item-monto'));

            // LÓGICA -> Agregar item
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
            const itemID = pizarra.getNuevoItemID();
            const nuevoItem = new Item(itemID, datoTipo, datoCategoria, datoNombre, datoMonto);

            if (Pizarra.existePizarra(pizarra)) {
                Pizarra.existenteAgregarItem(pizarra, nuevoItem);
            } else {
                pizarra.agregarItem(nuevoItem);
                pizarra.actualizarInformacion();
                Pizarra.guardarPizarra(pizarra);
            }

            // MOSTRANDO -> El nuevo item al usuario
            const $pizarraSeleccionada = $('#pizarra-seleccionada');
            const registroItem = Item.crearRegistro(nuevoItem);
            ManejadorDOM.agregar($pizarraSeleccionada, registroItem);

            // OCULTO -> Select categoria
            const $contenedorSelectCategoria = $('#contenedor-select-categoria');
            $contenedorSelectCategoria.hide();

            // Procedimiento de finalización
            formulario.reset();
            Modal.cerrar('modal-agregar-item');
            Navegador.scrollear("final");
            Navegador.scrollear("inicio", 3000);
        };
    }

    static getValidarFormRegistrarse() {
        return function validarFormRegistrarse(e) {
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
}

export { ManejadorEventos };