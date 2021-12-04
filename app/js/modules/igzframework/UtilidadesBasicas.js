class UtilidadesBasicas {
    static #limitarDecimales(numero, limite) {
        const expresionRegular = new RegExp("(\\d+\\.\\d{" + limite + "})(\\d)");
        const resultados = numero.toString().match(expresionRegular);
        
        return resultados ? parseFloat(resultados[1]) : numero.valueOf();
    }

    static calcularPorcentaje(valor, total, aproximacion = "exceso") {
        const porcentaje = valor * 100 / total;

        switch (aproximacion) {
            case "exceso":
                return porcentaje.toFixed(2); // Aplica redondeo de cifras
            case "defecto":
                return UtilidadesBasicas.#limitarDecimales(porcentaje, 2); // NO aplica redondeo de cifras
        }
    }

    static capitalizar(cadena) {
        if (typeof cadena !== 'string') return '';

        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
    }

    static comparar(valorA, valorB) {
        return $.isNumeric(valorA) && $.isNumeric(valorB) ? valorA - valorB : valorA.localeCompare(valorB);
    }

    static parseNumero(cadena) {
        cadena = cadena.replace(',', '.');
        return parseFloat(cadena);
    }
}

export { UtilidadesBasicas };