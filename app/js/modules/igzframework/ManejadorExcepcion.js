class ManejadorExcepcion {
    static separador = '-'.repeat(63);

    static #getInfoFormateada(excepcion) {
        return `:: Excepción - ${excepcion.name}\n${ManejadorExcepcion.separador}\n${excepcion.date || ""}\n${excepcion.message}\n`;
    }

    static generarLOG(excepcion, mostrarStackTrace = false) {
        const infoDepuracion = ManejadorExcepcion.#getInfoFormateada(excepcion);
        console.error(infoDepuracion);

        if(mostrarStackTrace) {
            console.warn(excepcion.stack);
        }
    }
}

export { ManejadorExcepcion };