import { UtilidadesFormulario } from '../igzframework.js';
import { Fecha, ManejadorDOM, Utilidades } from '../servicios.js';
import { VistaFormAcceso, VistaFormConfiguracion, VistaFormEliminarItem, VistaFormError, VistaFormItem, VistaFormRegistrarse, VistaOpcionSelect } from '../vistas.js';

class Formulario extends UtilidadesFormulario {
    // Métodos públicos
    static crearContenedoresDeError(inputs) {
        for (const input of inputs) {
            const $contenedorDeError = VistaFormError.crearContenedor(input);
            input.insertAdjacentElement('afterend', $contenedorDeError);
        }
    }

    static crearFormAcceso(identificador, nombreBtnPrincipal, nombreBtnSecundario) {
        identificador = Utilidades.obtenerIdentificador(identificador);
        return VistaFormAcceso.crear(identificador, nombreBtnPrincipal, nombreBtnSecundario);
    }

    static crearFormConfiguracion(identificador) {
        return VistaFormConfiguracion.crear(identificador);
    }

    static crearFormEliminarItem(identificador) {
        return VistaFormEliminarItem.crear(identificador);
    }

    static crearFormItem(identificador) {
        return VistaFormItem.crear(identificador);
    }

    static crearFormRegistrarse(identificador) {
        return VistaFormRegistrarse.crear(identificador);
    }

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