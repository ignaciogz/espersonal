import { Sesion } from '../igzframework.js';

class Navegador {
    // Propiedad pública
    static paginaActual = location.pathname.split("/").pop().split(".").shift();

    // Métodos públicos
    static cerrarSesion() {
        Sesion.eliminar("usuario_logeado");
    }

    static existeEnSesion(clave) {
        return Sesion.existe(clave);
    }

    static guardarEnSesion(clave, valor) {
        Sesion.guardar(clave, valor);
    }

    static iniciarSesion(datosDeSesion) {
        Sesion.guardar("usuario_logeado", datosDeSesion);
    }

    static obtenerDeSesion(clave) {
        return Sesion.obtener(clave).pop();
    }

    static redireccionar(ubicacion) {
        setTimeout(function () { location = ubicacion; }, 1000);
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