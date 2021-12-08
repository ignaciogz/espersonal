class ManejadorExcepcion {
    static separador = '-'.repeat(63);

    static #getInfoFormateada(excepcion) {
        return `:: Excepción - ${excepcion.name}\n${ManejadorExcepcion.separador}\n${excepcion.date || ""}\n${excepcion.message}\n`;
    }

    static generarLOG(excepcion, mostrarStackTrace = true) {
        const infoDepuracion = ManejadorExcepcion.#getInfoFormateada(excepcion);
        console.error(infoDepuracion);

        if(mostrarStackTrace) {
            console.warn(`:: Stack Trace [Optimizado para Google Chrome]\n${ManejadorExcepcion.separador}\n${excepcion.stack}`);
        }
    }
}

export { ManejadorExcepcion };