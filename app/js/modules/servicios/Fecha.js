import { UtilidadesFecha } from '../igzframework.js';
import { Utilidades } from '../servicios.js';

class Fecha extends UtilidadesFecha {
    static getFecha() {
        return Utilidades.formatearFecha(Fecha.anio, Fecha.mes);
    }
    
    static getFechaActual() {
        return Utilidades.formatearFecha(Fecha.anioActual, Fecha.mesActual);
    }

    static desformatearFecha(fechaFormateada) {
        const fechaDesformateada = Utilidades.desformatearFecha(fechaFormateada);
        Fecha.setFecha(fechaDesformateada.anio, fechaDesformateada.mes);
    }    
}

export { Fecha };