class Utilidades {
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

    static formatearMonto(monto) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });

        return formatter.format(monto);
    }

    static desformatearMonto(monto) {
        let montoDesformateado  = monto;
        montoDesformateado = montoDesformateado.replace('$', '');
        montoDesformateado = montoDesformateado.replaceAll('.', '');
        montoDesformateado = montoDesformateado.replace(',', '.');
        debugger
        return parseFloat(montoDesformateado);
    }
}

export { Utilidades };