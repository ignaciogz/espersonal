class UtilidadesTabla {
    static #getElementoPadre(elemento, etiquetaPadreBuscada) {
        return elemento.parents(etiquetaPadreBuscada).eq(0);
    }

    static getArrayDeFilas(tabla) {
        return tabla.find('tr').slice(1).toArray();
    }

    static getContenedorDato(fila, indexColumna) {
        return fila.children('td').eq(indexColumna);
    }

    static getFila(elemento) {
        return UtilidadesTabla.#getElementoPadre(elemento, 'tr');
    }

    static getTabla(elemento) {
        return UtilidadesTabla.#getElementoPadre(elemento, 'table');
    }

    static setIconoDeOrdenamiento(elemento, asc) {
        $("th").each(function () {
            $(this).removeClass("asc desc");
        });

        if (asc) {
            elemento.addClass("asc");
        }
        else {
            elemento.addClass("desc");
        }
    }
}

export { UtilidadesTabla };