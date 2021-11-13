class UtilidadesTabla {
    static #getElementoPadre(elemento, etiquetaPadreBuscada) {
        return elemento.parents(etiquetaPadreBuscada).eq(0);
    }

    static comparar(valorA, valorB) {
        return $.isNumeric(valorA) && $.isNumeric(valorB) ? valorA - valorB : valorA.localeCompare(valorB);
    }

    static getArrayDeFilas(tabla) {
        return tabla.find('tr').slice(1).toArray();
    }

    static getTabla(elemento) {
        return UtilidadesTabla.#getElementoPadre(elemento, 'table');
    }

    static getFila(elemento) {
        return UtilidadesTabla.#getElementoPadre(elemento, 'tr');
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