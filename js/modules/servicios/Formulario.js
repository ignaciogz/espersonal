import { UtilidadesFormulario } from '../igzframework.js';

import { ManejadorDOM } from '../servicios.js';

class Formulario extends UtilidadesFormulario {
    // Métodos privados
    static crearOption(valor) {
        let $option = document.createElement("option");
        $option.setAttribute("value", valor);

        $option.text = valor;

        return $option;
    }

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
}

export { Formulario };