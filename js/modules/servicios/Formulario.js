import { UtilidadesFormulario } from '../igzframework.js';
import { Fecha, ManejadorDOM } from '../servicios.js';

class Formulario extends UtilidadesFormulario {
    // Métodos públicos
    static crearOpcionesSelectAnio(usuarioLogeado) {
        const fragmento = ManejadorDOM.crearFragmento();

        for (let anio = usuarioLogeado.anioDeRegistro; anio <= usuarioLogeado.anioDeRegistro + 3; anio++) {
            let optionDelSelect = Formulario.crearOption(anio);
            ManejadorDOM.agregar(fragmento, optionDelSelect);
        }

        return fragmento;
    }

    static crearOpcionesSelectCategoria(categorias) {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const categoria of categorias.getListado()) {
            let optionDelSelect = Formulario.crearOption(categoria.nombre);
            ManejadorDOM.agregar(fragmento, optionDelSelect);
        }

        return fragmento;
    }

    static crearOpcionesSelectMes() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const mes of Fecha.meses) {
            let optionDelSelect = Formulario.crearOption(mes);
            ManejadorDOM.agregar(fragmento, optionDelSelect);
        }

        return fragmento;
    }
}

export { Formulario };