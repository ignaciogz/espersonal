import { Navegador } from '../igzframework.js';
import { Fecha, Formulario, ManejadorDOM, Modal } from '../servicios.js';
import { DatosSesionDeUsuario, Item, Pizarra, Usuario } from '../clases.js';

class ManejadorEventos {
    static cerrarApp() {
        return function (e) {
            e.preventDefault();
            Navegador.cerrarSesion();
            Navegador.redireccionar("index.html");
        };
    }

    static actualizarInformacionPizarra() {
        return function () {
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
            pizarra.actualizarInformacion();
            ManejadorDOM.mostrarInformacionPizarra(pizarra);
        };
    }

    static toggleDisplaySelectCategoria() {
        return function (e) {
            const $contenedorSelectCategoria = document.getElementById('contenedor-select-categoria');

            if (this.value === "Ingreso") {
                ManejadorDOM.display($contenedorSelectCategoria, 'none');
            } else {
                ManejadorDOM.display($contenedorSelectCategoria);
            }

        };
    }

    static validarFormAcceso() {
        return function (e) {
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
                const $error = document.getElementById('error-acceso');
                ManejadorDOM.mostrarError($error, "Datos de ingreso incorrectos");
                formulario.reset();
            }
        };
    }

    static validarFormAgregarItem() {
        return function (e) {
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
        };
    }

    static validarFormRegistrarse() {
        return function (e) {
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
                Navegador.redireccionar("pizarra.html");
            } else {
                const $error = document.getElementById('error-registrarse');
                ManejadorDOM.mostrarError($error, "Nombre de usuario NO disponible");
                formulario.reset();
            }
        };
    }
}

export { ManejadorEventos };