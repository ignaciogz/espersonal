class UtilidadesTabla {
    static comparar(valorA, valorB) {
        return $.isNumeric(valorA) && $.isNumeric(valorB) ? valorA - valorB : valorA.localeCompare(valorB);
    }

    static getArrayDeFilas(tabla) {
        return tabla.find('tr').slice(1).toArray();
    }

    static getTabla(thDisparador) {
        return thDisparador.parents('table').eq(0);
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