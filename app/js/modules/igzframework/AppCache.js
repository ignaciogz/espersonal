import { Sesion } from '../igzframework.js';

class AppCache {
    // Propiedades privadas
    static PREFIJO = "AppCache";

    // Métodos privados
    static getNombreClave(clave) {
        return `${AppCache.PREFIJO}::${clave}`;
    }

    // Métodos públicos
    static actualizar(clave, valor) {
        AppCache.eliminar(clave);
        AppCache.guardar(clave, valor);
    }

    static eliminar(clave) {
        clave = AppCache.getNombreClave(clave);

        sessionStorage.removeItem(clave);
    }

    static existe(clave) {
        clave = AppCache.getNombreClave(clave);

        return sessionStorage.getItem(clave) !== null;
    }

    static guardar(clave, valor) {
        clave = AppCache.getNombreClave(clave);

        Sesion.guardar(clave, valor);
    }

    static limpiar() {
        for (let clave in sessionStorage) {
            if (clave.includes(AppCache.PREFIJO)) {
                sessionStorage.removeItem(clave);
            }
        }
    }
    
    static obtener(clave) {
        clave = AppCache.getNombreClave(clave);

        return JSON.parse(sessionStorage.getItem(clave)).pop();
    }
}

export { AppCache };