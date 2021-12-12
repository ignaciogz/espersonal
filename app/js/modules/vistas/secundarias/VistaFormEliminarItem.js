class VistaFormEliminarItem {
    static crear(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="col s12">
                                                <div class="datos-del-item">
                                                    <strong>Nombre:</strong> 
                                                    <p id="${identificador}-nombre"></p>
                                                </div>
                                                <div class="datos-del-item">
                                                    <strong>Tipo:</strong>
                                                    <p id="${identificador}-tipo"></p>
                                                </div>
                                                <div class="datos-del-item">
                                                    <strong>Categoría:</strong>
                                                    <p id="${identificador}-categoria"></p>
                                                </div>
                                                <div class="datos-del-item">
                                                    <strong>Monto:</strong>
                                                    <p id="${identificador}-monto"></p>
                                                </div>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }
}

export { VistaFormEliminarItem };