import { AppCache, Sesion } from '../igzframework.js';

class Navegador {
    // Propiedad pública
    static paginaActual = Navegador.#getPaginaActual(location.pathname);

    // Métodos privados
    static #getPaginaActual(ubicacion) {
        let paginaActual;
        paginaActual = ubicacion.substring(1); // Elimino la barra inicial
        paginaActual = paginaActual.split(".").shift(); // Elimino la extension

        return paginaActual;
    }

    // Métodos públicos
    static actualizarEnSesion(datosDeSesion) {
        Navegador.eliminarDeSesion("usuario_logeado");
        Navegador.guardarEnSesion("usuario_logeado", datosDeSesion);
    }
    
    static cerrarSesion() {
        Navegador.eliminarDeSesion("usuario_logeado");
        AppCache.limpiar();
    }

    static eliminarDeSesion(clave) {
        Sesion.eliminar(clave);
    }

    static existeEnSesion(clave) {
        return Sesion.existe(clave);
    }

    static guardarEnSesion(clave, valor) {
        Sesion.guardar(clave, valor);
    }

    static iniciarSesion(datosDeSesion) {
        Navegador.guardarEnSesion("usuario_logeado", datosDeSesion);
    }

    static obtenerDeSesion(clave) {
        return Sesion.obtener(clave).pop();
    }

    static redireccionar(ubicacion) {
        setTimeout(function () { location = `/${ubicacion}`; }, 1000);
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

        setTimeout(function () {
            window.scroll({
                top: posicion,
                behavior: "smooth"
            });
        }, tiempo);
    }
}

export { Navegador };