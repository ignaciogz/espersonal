import { UtilidadesDOM } from '../igzframework.js';

class UtilidadesFormulario {
    static getInput(id) {
        const $input = document.getElementById(id);

        if (UtilidadesDOM.existeEnDOM($input)) {
            return $input.value;
        }
    }

    static getOpcionDeSelectElegida(id) {
        const $select = document.getElementById(id);

        if (UtilidadesDOM.existeEnDOM($select)) {
            const indiceSeleccionado = $select.selectedIndex;
            const opcionSeleccionada = $select.options[indiceSeleccionado].value;

            return opcionSeleccionada;
        }
    }

    static getRadioBtnElegido(name) {
        const $radioSeleccionado = document.querySelector(`input[name="${name}"]:checked`);

        if (UtilidadesDOM.existeEnDOM($radioSeleccionado)) {
            const radioSeleccionado = $radioSeleccionado.value;

            return radioSeleccionado;
        }
    }
}

export { UtilidadesFormulario };