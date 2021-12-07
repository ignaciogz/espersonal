import { UtilidadesDOM } from '../igzframework.js';
import { Excepcion_obtenerDeFormulario, Excepcion_setearEnFormulario } from '../igzframework.js';

class UtilidadesFormulario {
    // Métodos privados
    static #getElementoPadre(elemento, etiquetaPadreBuscada) {
        return elemento.parents(etiquetaPadreBuscada).eq(0);
    }
    
    static getFormulario(elemento) {
            return UtilidadesFormulario.#getElementoPadre(elemento, 'form');
    }

    static #inicializarValidadorDeCampos(selector) {
        const $inputsRequeridos = $(`${selector} [required]`);

        for (const input of $inputsRequeridos) {
            $(selector).data(`campo-valido-${input.id}`, true);
        }
    }

    // Métodos públicos
    static getFormularioIDdelInput($input) {
        return `#${$input.form.id}`;
    }

    static getInput(id) {
        const $input = $(`#${id}`);

        if (UtilidadesDOM.existeEnDOM($input)) {
            return $input.val().trim();
        }
        else {
            new Excepcion_obtenerDeFormulario("input", id);
        }
    }

    static getOpcionDeSelectElegida(id) {
        const $opcionSeleccionada = $(`#${id} option:selected`);

        if (UtilidadesDOM.existeEnDOM($opcionSeleccionada)) {
            const opcionSeleccionada = $opcionSeleccionada.val();

            return opcionSeleccionada;
        }
        else {
            new Excepcion_obtenerDeFormulario("select", id);
        }
    }

    static getRadioBtnElegido(name) {
        const $radioSeleccionado = $(`input[name="${name}"]:checked`);

        if (UtilidadesDOM.existeEnDOM($radioSeleccionado)) {
            const radioSeleccionado = $radioSeleccionado.val();

            return radioSeleccionado;
        }
        else {
            new Excepcion_obtenerDeFormulario("radio", name);
        }
    }

    static inicializar(formularioID) {
        UtilidadesFormulario.ocultarContenedorDeError(`${formularioID} .form-error`);
        UtilidadesFormulario.reset(formularioID);
        UtilidadesFormulario.ocultarSelect(`${formularioID} .contenedor-select-categoria`);
        UtilidadesFormulario.#inicializarValidadorDeCampos(formularioID);
    }

    static mostrarContenedorDeError(selector) {
        const $contenedorDeError = $(selector);
        $contenedorDeError.addClass('mostrar-form-error');
    }

    static mostrarSelect(selector) {
        const $contenedorSelect = $(selector);
        $contenedorSelect.show();
    }
    
    static ocultarContenedorDeError(selector) {
        const $contenedorDeError = $(selector);
        $contenedorDeError.removeClass('mostrar-form-error');
    }

    static ocultarSelect(selector) {
        const $contenedorSelect = $(selector);
        $contenedorSelect.hide();
    }

    static reset(selector) {
        $(selector)[0].reset();
    }

    static setInput(id, valor) {
        const $input = $(`#${id}`);

        if (UtilidadesDOM.existeEnDOM($input)) {
            $input.val(valor);
        }
        else {
            new Excepcion_setearEnFormulario("input", id, valor);
        }
    }

    static setOpcionDeSelect(id, valor) {
        const $opcion = $(`#${id} option[value="${valor}"]`);

        if (UtilidadesDOM.existeEnDOM($opcion)) {
            $opcion.prop('selected', true);
        }
        else {
            new Excepcion_setearEnFormulario("select", id, valor);
        }
    }

    static setRadioBtn(name, valor) {
        const $radio = $(`input[name="${name}"][value="${valor}"]`);
        
        if (UtilidadesDOM.existeEnDOM($radio)) {
            $radio.prop('checked', true);
        }
        else {
            new Excepcion_setearEnFormulario("radio", name, valor);
        }
    }

    static toggleDisplaySelect(selector, valorSeleccionado, opciones) {
        switch (valorSeleccionado) {
            case opciones.mostrar:
                UtilidadesFormulario.mostrarSelect(selector);
                break;
            case opciones.ocultar:
                UtilidadesFormulario.ocultarSelect(selector);
                break;
        }
    }

    static toggleDisplayFormError(selector, condicion) {
        if (condicion) {
            UtilidadesFormulario.ocultarContenedorDeError(selector);
        } else {
            UtilidadesFormulario.mostrarContenedorDeError(selector);
        }
    }

    static validarCampos(selector) {
        const $inputsRequeridos = $(`${selector} [required]`);

        for (const input of $inputsRequeridos) {
            const campoValido = $(selector).data(`campo-valido-${input.id}`);
            
            if (!campoValido) {
                return false;
            }
        }

        return true;
    }
}

export { UtilidadesFormulario };