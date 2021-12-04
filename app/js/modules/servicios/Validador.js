import { ManejadorEventos } from '../servicios.js';
import { Formulario } from '../clases.js'

class Validador {
    static regex = {
        nombreItem: "^[A-Za-z0-9ÑñÁáÉéÍíÓóÚú][A-Za-z0-9ÑñÁáÉéÍíÓóÚú\\s\\.\\,Üü]*$",
        montoItem: "^[0-9]+((\\.|\\,)[0-9]{1,2})?$"
    }

    static formularioEsValido(selector) {
        const $inputsRequeridos = $(`${selector} [required]`);

        for (const input of $inputsRequeridos) {
            const campoValido = $(selector).data(`campo-valido-${input.id}`);
            
            if (!campoValido) {
                return false;
            }
        }

        return true;
    }

    static validarFormulario(selector) {
        const $inputsRequeridos = $(`${selector} [required]`);

        Formulario.crearContenedoresDeError($inputsRequeridos);
        ManejadorEventos.asociar($inputsRequeridos, 'keyup', ManejadorEventos.getHandler("validarCampos"));
        ManejadorEventos.asociar($inputsRequeridos, 'blur', ManejadorEventos.getHandler("validarCampos"));
    }
}

export { Validador };