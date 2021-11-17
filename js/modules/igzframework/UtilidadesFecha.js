class UtilidadesFecha {
    // Propiedades privadas
    static hoy = new Date();

    // Propiedades públicas
    static meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];
    static anioActual = UtilidadesFecha.hoy.getFullYear();
    static mesActual = UtilidadesFecha.meses[UtilidadesFecha.hoy.getMonth()];

    // Métodos privados
    static setFecha(anio, mes) {
        UtilidadesFecha.anio = anio;
        UtilidadesFecha.mes = mes;
    }

    // Métodos públicos
    static getAnio() {
        return UtilidadesFecha.anio;
    }
    
    static getMes() {
        return UtilidadesFecha.mes;
    }
}

export { UtilidadesFecha };