class Utilidades {
    static formatearFecha(anio, mes) {
        return `${anio} - ${mes}`;
    }

    static formatearMonto(monto) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });

        return formatter.format(monto);
    }

    static desformatearMonto(monto) {
        let montoDesformateado = monto;
        montoDesformateado = monto.replace('$&nbsp;', '');
        montoDesformateado = montoDesformateado.replace('.', '');
        montoDesformateado = montoDesformateado.replace(',', '.');

        return parseFloat(montoDesformateado);
    }
}

export { Utilidades };