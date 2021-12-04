import { Validador } from '../servicios.js'

class VistaFormItem {
    static crear(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="input-field col s12">
                                                <input id="${identificador}-nombre" type="text" title="Debe comenzar con una letra o número. Sólo se permiten: letras, números, espacios en blanco, comas y puntos" required pattern=${Validador.regex.nombreItem} />
                                                <label for="${identificador}-nombre">Nombre</label>
                                            </div>

                                            <div class="input-field col 12">
                                                <p>
                                                    Seleccione el tipo de item:
                                                </p>
                                                <p class="contenedor-radio-tipo">
                                                    <label><input class="with-gap" name="${identificador}-radio-tipo" type="radio" value="Ingreso" checked /><span>Ingreso</span></label>
                                                </p>
                                                <p class="contenedor-radio-tipo">
                                                    <label><input class="with-gap" name="${identificador}-radio-tipo" type="radio" value="Egreso" /><span>Egreso</span></label>
                                                </p>
                                            </div>
                                            
                                            <div class="contenedor-select-categoria input-field col s12">
                                                <select id="${identificador}-select-categoria">
                                                    <option disabled>- Categoría -</option>
                                                    <!-- Aquí se agrega DINÁMICAMENTE -->
                                                </select>
                                                <label for="${identificador}-select-categoria">Seleccione una categoría:</label>
                                            </div>

                                            <div class="input-field col s12">
                                                <input id="${identificador}-monto" type="text" title="Deben ser números. Máximo 2 decimales" required pattern=${Validador.regex.montoItem}>
                                                <label for="${identificador}-monto">Monto</label>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }
}

export { VistaFormItem };