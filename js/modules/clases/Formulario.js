import { UtilidadesFormulario } from '../igzframework.js';
import { Fecha, ManejadorDOM } from '../servicios.js';
import { VistaOpcionSelect } from '../vistas.js';

class Formulario extends UtilidadesFormulario {
    // Métodos públicos
    static crearOpcionesSelectAnio(usuarioLogeado) {
        const fragmento = ManejadorDOM.crearFragmento();

        for (let anio = usuarioLogeado.anioDeRegistro; anio <= usuarioLogeado.anioDeRegistro + 3; anio++) {
            let opcionDelSelect = VistaOpcionSelect.crearOpcion(anio);
            ManejadorDOM.agregar(fragmento, opcionDelSelect);
        }

        return fragmento;
    }

    static crearOpcionesSelectCategoria(categorias) {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const categoria of categorias.getListado()) {
            let opcionDelSelect = VistaOpcionSelect.crearOpcion(categoria.nombre);
            ManejadorDOM.agregar(fragmento, opcionDelSelect);
        }

        return fragmento;
    }

    static crearOpcionesSelectMes() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const mes of Fecha.meses) {
            let opcionDelSelect = VistaOpcionSelect.crearOpcion(mes);
            ManejadorDOM.agregar(fragmento, opcionDelSelect);
        }

        return fragmento;
    }
}

export { Formulario };