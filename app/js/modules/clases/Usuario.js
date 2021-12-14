import { Ajax, Almacenamiento, Navegador } from '../igzframework.js';
import { Fecha, Validador } from '../servicios.js';
import { JSON_usuarios } from '../json.js';
import { DatosSesionDeUsuario } from '../clases.js';

class Usuario {
    constructor(nombre = null, contrasena = null, tipo = "invitado", anioDeRegistro = null) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.tipo = tipo;
        this.anioDeRegistro = anioDeRegistro;
    }

    static get() {
        if (Usuario.instancia instanceof Usuario) {
            return Usuario.instancia;
        }

        return Usuario.instancia = new Usuario();
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

    static validarUsuario(usuario) {
        if (Almacenamiento.existe("usuarios_registrados")) {
            const fn_busqueda = Usuario.fn_usuarioBuscado(usuario.nombre, usuario.contrasena);

            return Almacenamiento.buscar("usuarios_registrados", fn_busqueda) ? true : false;
        } else {
            return undefined;
        }
    }

    static actualizarFechaSeleccionada(usuarioLogeado, fechaSeleccionada) {
        const datosDeSesion = new DatosSesionDeUsuario(usuarioLogeado.nombre, usuarioLogeado.anioDeRegistro, fechaSeleccionada);
        Navegador.actualizarEnSesion(datosDeSesion);
    }

    static buscarUsuario(usuario) {
        if (Almacenamiento.existe("usuarios_registrados")) {
            const fn_busqueda = Usuario.fn_nombreUsuarioBuscado(usuario.nombre);

            return Almacenamiento.buscar("usuarios_registrados", fn_busqueda);
        } else {
            return undefined;
        }
    }

    static cargarJSON_usuariosPredefinidos() {
        Ajax.getJQXHR(JSON_usuarios)
            .done(Usuario.fn_cargarUsuariosPredefinidos());
    }

    static estaLogeado() {
        return Navegador.existeEnSesion("usuario_logeado");
    }

    static guardarUsuario(usuario) {
        Almacenamiento.guardar("usuarios_registrados", usuario);
    }

    static logearUsuario(usuario) {
        const datosDeSesion = new DatosSesionDeUsuario(usuario.nombre, usuario.anioDeRegistro, Fecha.getFechaActual());
        Navegador.iniciarSesion(datosDeSesion);
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

    static fn_cargarUsuariosPredefinidos() {
        return function(data) {
            for (const usuario of data) {
                if (!Validador.validarExistenciaDeUsuario(usuario)) {
                    Usuario.guardarUsuario(usuario);
                }
            }
        }
    }

    static fn_nombreUsuarioBuscado(nombre) {
        return elemento => elemento.nombre === nombre;
    }

    static fn_usuarioBuscado(nombre, contrasena) {
        return elemento => elemento.nombre === nombre && elemento.contrasena === contrasena;
    }
}

export { Usuario };