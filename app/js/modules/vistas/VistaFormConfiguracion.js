class VistaFormConfiguracion {
    static crear(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="input-field col s12 m6">
                                                <select id="${identificador}-select-anio" required>
                                                    <option disabled>- Año -</option>
                                                    <!-- Aquí se agrega DINÁMICAMENTE -->
                                                </select>
                                                <label>Seleccione el año:</label>
                                            </div>

                                            <div class="input-field col s12 m6">
                                                <select id="${identificador}-select-mes" required>
                                                    <option disabled>- Mes -</option>
                                                    <!-- Aquí se agrega DINÁMICAMENTE -->
                                                </select>
                                                <label>Seleccione el mes:</label>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }
}

export { VistaFormConfiguracion };