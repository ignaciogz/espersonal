class Almacenamiento {
    static buscar(clave, fn_busqueda) {
        const almacenado = Almacenamiento.obtener(clave);

        return almacenado.find(fn_busqueda);
    }

    static eliminar(clave) {
        localStorage.removeItem(clave);
    }

    static existe(clave) {
        return localStorage.getItem(clave) !== null;
    }

    static guardar(clave, valor) {
        let almacenado;

        if (Almacenamiento.existe(clave)) {
            almacenado = Almacenamiento.obtener(clave);
        } else {
            almacenado = new Array();
        }

        almacenado.push(valor);

        const JSON_almacenado = JSON.stringify(almacenado);
        localStorage.setItem(clave, JSON_almacenado);
    }

    static obtener(clave) {
        return JSON.parse(localStorage.getItem(clave));
    }
}

export { Almacenamiento };