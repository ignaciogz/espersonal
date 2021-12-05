import { ManejadorEventos } from '../servicios.js';
import { Formulario, Usuario } from '../clases.js'

class Validador {
    static regex = {
        nombreItem: "^[A-Za-z0-9ÑñÁáÉéÍíÓóÚú][A-Za-z0-9ÑñÁáÉéÍíÓóÚú\\s\\.\\,Üü]*$",
        montoItem: "^[0-9]+((\\.|\\,)[0-9]{1,2})?$"
    }

    static formularioEsValido(selector) {
        return Formulario.validarCampos(selector);
    }

    static validarCamposDelFormulario(selector) {
        const $inputsRequeridos = $(`${selector} [required]`);

        Formulario.crearContenedoresDeError($inputsRequeridos);

        ManejadorEventos.asociar($inputsRequeridos, 'keyup', ManejadorEventos.getHandler("validarCampo"));
        ManejadorEventos.asociar($inputsRequeridos, 'blur', ManejadorEventos.getHandler("validarCampo"));
    }

    static validarDatosDeUsuario(usuario) {
        return Usuario.validarUsuario(usuario) ? true : false;
    }

    static validarExistenciaDeUsuario(usuario) {
        return Usuario.buscarUsuario(usuario) ? true : false;
    }
}

export { Validador };