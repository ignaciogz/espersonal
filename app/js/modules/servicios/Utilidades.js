import { UtilidadesBasicas } from "../igzframework.js";

class Utilidades extends UtilidadesBasicas {
    static desformatearFecha(fecha) {
        let fechaDesformateada = fecha;
        fechaDesformateada = fecha.replaceAll(' ', '');
        fechaDesformateada = fechaDesformateada.split('-');
        
        return {
            anio: fechaDesformateada[0],
            mes: fechaDesformateada[1]
        };
    }

    static formatearFecha(anio, mes) {
        return `${anio} - ${mes}`;
    }

    static desformatearMonto(monto) {
        let montoDesformateado  = monto;
        montoDesformateado = montoDesformateado.replace('$', '');
        montoDesformateado = montoDesformateado.replaceAll('.', '');
        montoDesformateado = montoDesformateado.replace(',', '.');
        
        return parseFloat(montoDesformateado);
    }

    static formatearMonto(monto) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });

        return formatter.format(monto);
    }

    static sanitizarIdentificador(identificador) {
        identificador = identificador.replace('á', 'a');
        identificador = identificador.replace('é', 'e');
        identificador = identificador.replace('í', 'i');
        identificador = identificador.replace('ó', 'o');
        identificador = identificador.replace('ú', 'u');

        return identificador;
    }
}

export { Utilidades };