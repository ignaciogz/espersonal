import { UtilidadesDOM } from '../igzframework.js';

class UtilidadesFormulario {
    // Métodos privados
    static crearOption(valor) {
        let $option = document.createElement("option");
        $option.setAttribute("value", valor);

        $option.text = valor;

        return $option;
    }

    // Métodos públicos
    static getInput(id) {
        const $input = $(id);

        if (UtilidadesDOM.existeEnDOM($input)) {
            return $input.val();
        }
        else {
            throw `NO se pudo obtener el dato del input cuyo ID es: ${id}`;
        }
    }

    static getOpcionDeSelectElegida(selector) {
        const $opcionSeleccionada = $(`${selector} option:selected`);

        if (UtilidadesDOM.existeEnDOM($opcionSeleccionada)) {
            const opcionSeleccionada = $opcionSeleccionada.val();

            return opcionSeleccionada;
        }
        else {
            throw `NO se pudo obtener la opción seleccionada del select cuya Selector es: ${selector}`;
        }
    }

    static getRadioBtnElegido(name) {
        const $radioSeleccionado = $(`input[name="${name}"]:checked`);

        if (UtilidadesDOM.existeEnDOM($radioSeleccionado)) {
            const radioSeleccionado = $radioSeleccionado.val();

            return radioSeleccionado;
        }
        else {
            throw `NO se pudo obtener el botón de radio seleccionado cuyo name es: ${name}`;
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
        const $input = $(id);

        if (UtilidadesDOM.existeEnDOM($input)) {
            return $input.val(valor);
        }
        else {
            throw `NO se pudo agregar el valor al input cuyo ID es: ${id}`;
        }
    }

    static setOpcionDeSelect(selector, valor) {
        const $opcion = $(`${selector} option[value="${valor}"]`);

        if (UtilidadesDOM.existeEnDOM($opcion)) {
            $opcion.prop('selected', true);
        }
        else {
            throw `NO se pudo agregar la opción seleccionada del select cuyo Selector es: ${selector}`;
        }
    }

    static setRadioBtn(name, tipo) {
        const $radio = $(`input[name="${name}"][value="${tipo}"]`);

        if (UtilidadesDOM.existeEnDOM($radio)) {
            $radio.prop('checked', true);
        }
        else {
            throw `NO se pudo marcar el botón de radio seleccionado cuyo name es: ${name}`;
        }
    }

    static toggleDisplaySelect(selector, valorSeleccionado, opciones) {
        function mostrarSelect(valorSeleccionado ,opciones) {
            if(valorSeleccionado === opciones.mostrar) {
                return true;
            }

            if(valorSeleccionado === opciones.ocultar) {
                return false;
            }
        }

        if (mostrarSelect(valorSeleccionado ,opciones)) {
            UtilidadesFormulario.mostrarSelect(selector);
        } else {
            UtilidadesFormulario.ocultarSelect(selector);
        }
    }
}

export { UtilidadesFormulario };