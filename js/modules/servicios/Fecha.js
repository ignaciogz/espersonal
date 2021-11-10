import { Utilidades } from '../servicios.js';

class Fecha {
    // Propiedades privadas
    static #hoy = new Date();

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
    static anioActual = Fecha.#hoy.getFullYear();
    static mesActual = Fecha.meses[Fecha.#hoy.getMonth()];

    // Métodos públicos
    static getFecha() {
        return Utilidades.formatearFecha(Fecha.anio, Fecha.mes);
    }

    static getFechaActual() {
        return Utilidades.formatearFecha(Fecha.anioActual, Fecha.mesActual);
    }

    static setFecha(anio, mes) {
        Fecha.anio = anio;
        Fecha.mes = mes;
    }
}

export { Fecha };