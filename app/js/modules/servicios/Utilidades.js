import { UtilidadesBasicas } from "../igzframework.js";

class Utilidades extends UtilidadesBasicas {
    static #sanitizarIdentificador(identificador) {
        identificador = identificador.replace('á', 'a');
        identificador = identificador.replace('é', 'e');
        identificador = identificador.replace('í', 'i');
        identificador = identificador.replace('ó', 'o');
        identificador = identificador.replace('ú', 'u');

        return identificador;
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

    static formatearFecha(anio, mes) {
        return `${anio} - ${mes}`;
    }

    static desformatearMonto(monto) {
        let montoDesformateado  = monto;
        montoDesformateado = montoDesformateado.replace('$', '');
        montoDesformateado = montoDesformateado.replaceAll('.', '');
        montoDesformateado = montoDesformateado.trim();

        return montoDesformateado;
    }

    static formatearMonto(monto) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });

        return formatter.format(monto);
    }

    static formatearPorcentaje(porcentaje) {
        porcentaje = porcentaje.toString();
        return porcentaje.replace('.', ',');
    }

    static obtenerIdentificador(cadena) {
        const identificador = cadena.toLowerCase().replace(" ", "-");
        return Utilidades.#sanitizarIdentificador(identificador);
    }

    static obtenerNombeDelMetodoGenerador(identificador) {
        const identificadorVista = identificador.split('-').map(cadena => Utilidades.capitalizar(cadena)).join('');
        return identificadorVista;
    }
}

export { Utilidades };