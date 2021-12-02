class Sesion {
    static eliminar(clave) {
        sessionStorage.removeItem(clave);
    }

    static existe(clave) {
        return sessionStorage.getItem(clave) !== null;
    }

    static guardar(clave, valor) {
        let almacenado;

        if (Sesion.existe(clave)) {
            almacenado = Sesion.obtener(clave);
        } else {
            almacenado = new Array();
        }

        almacenado.push(valor);

        const JSON_almacenado = JSON.stringify(almacenado);
        sessionStorage.setItem(clave, JSON_almacenado);
    }

    static obtener(clave) {
        return JSON.parse(sessionStorage.getItem(clave));
    }
}

export { Sesion };