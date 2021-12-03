class VistaFormItem {
    static crear(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="input-field col s12">
                                                <input id="${identificador}-nombre" type="text" title="Debe comenzar con una letra o número. Sólo se permiten: letras, números, espacios en blanco y punto." required pattern="^[A-Za-z0-9ÑñÁáÉéÍíÓóÚú][A-Za-z0-9ÑñÁáÉéÍíÓóÚú\s\.Üü]*$" />
                                                <label for="${identificador}-nombre">Nombre</label>
                                            </div>

                                            <div class="input-field col 12">
                                                <p>
                                                    Seleccione el tipo de item:
                                                </p>
                                                <p class="contenedor-radio-tipo">
                                                    <label><input class="with-gap" name="${identificador}-radio-tipo" type="radio" value="Ingreso" checked required /><span>Ingreso</span></label>
                                                </p>
                                                <p class="contenedor-radio-tipo">
                                                    <label><input class="with-gap" name="${identificador}-radio-tipo" type="radio" value="Egreso" required /><span>Egreso</span></label>
                                                </p>
                                            </div>
                                            
                                            <div class="contenedor-select-categoria input-field col s12">
                                                <select id="${identificador}-select-categoria" required>
                                                    <option disabled>- Categoría -</option>
                                                    <!-- Aquí se agrega DINÁMICAMENTE -->
                                                </select>
                                                <label for="${identificador}-select-categoria">Seleccione una categoría:</label>
                                            </div>

                                            <div class="input-field col s12">
                                                <input id="${identificador}-monto" type="number" min=0.01 step="any" required>
                                                <label for="${identificador}-monto">Monto</label>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }
}

export { VistaFormItem };