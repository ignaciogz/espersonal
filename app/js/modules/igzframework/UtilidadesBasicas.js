class UtilidadesBasicas {
    static capitalizar(cadena) {
        if (typeof cadena !== 'string') return '';

        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
    }

    static comparar(valorA, valorB) {
        return $.isNumeric(valorA) && $.isNumeric(valorB) ? valorA - valorB : valorA.localeCompare(valorB);
    }

    static limitarDecimales(numero, limite) {
        const expresionRegular = new RegExp("(\\d+\\.\\d{" + limite + "})(\\d)");
        const resultados = numero.toString().match(expresionRegular);
        
        return resultados ? parseFloat(resultados[1]) : numero.valueOf();
    }
}

export { UtilidadesBasicas };