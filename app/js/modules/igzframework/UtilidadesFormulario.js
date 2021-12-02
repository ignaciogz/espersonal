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

    // Métodos públicos
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

    static ocultarSelect(selector) {
        const $contenedorSelect = $(selector);
        $contenedorSelect.hide();
    }

    static mostrarSelect(selector) {
        const $contenedorSelect = $(selector);
        $contenedorSelect.show();
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
}

export { UtilidadesFormulario };