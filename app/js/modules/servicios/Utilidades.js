import { UtilidadesBasicas } from "../igzframework.js";

class Utilidades extends UtilidadesBasicas {
    static formatearFecha(anio, mes) {
        return `${anio} - ${mes}`;
    }

    static desformatearFecha(fecha) {
        let fechaDesformateada = fecha;
        fechaDesformateada = fecha.replaceAll(' ', '');
        fechaDesformateada = fechaDesformateada.split('-');
        
        return {
            anio: fechaDesformateada[0],
            mes: fechaDesformateada[1]
        };
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
}

export { Utilidades };