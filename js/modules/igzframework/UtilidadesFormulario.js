import { UtilidadesDOM } from '../igzframework.js';

class UtilidadesFormulario {
    static getInput(id) {
        const $input = $(id);

        if (UtilidadesDOM.existeEnDOM($input)) {
            return $input.val();
        }
        else {
            throw `NO se pudo obtener el dato del input cuyo ID es: ${id}`;
        }
    }

    static getOpcionDeSelectElegida(id) {
        const $opcionSeleccionada = $(`${id} option:selected`);

        if (UtilidadesDOM.existeEnDOM($opcionSeleccionada)) {
            const opcionSeleccionada = $opcionSeleccionada.val();

            return opcionSeleccionada;
        }
        else {
            throw `NO se pudo obtener la opción seleccionada del select cuyo ID es: ${id}`;
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
}

export { UtilidadesFormulario };