import { Almacenamiento, Navegador } from '../igzframework.js';
import { JSON_usuariosPredefinidos } from '../json.js';

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
            const fn_busqueda = Usuario.fn_usuarioBuscado(usuario.nombre, usuario.contrasena);

            return Almacenamiento.buscar("usuarios_registrados", fn_busqueda) ? true : false;
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
            const fn_busqueda = Usuario.fn_nombreUsuarioBuscado(usuario.nombre);

            return Almacenamiento.buscar("usuarios_registrados", fn_busqueda);
        } else {
            return undefined;
        }
    }

    static cargarJSON_usuariosPredefinidos() {
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

    static fn_nombreUsuarioBuscado(nombre) {
        return elemento => elemento.nombre === nombre;
    }

    static fn_usuarioBuscado(nombre, contrasena) {
        return elemento => elemento.nombre === nombre && elemento.contrasena === contrasena;
    }
}

export { Usuario };