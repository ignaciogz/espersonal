class UtilidadesBasicas {
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