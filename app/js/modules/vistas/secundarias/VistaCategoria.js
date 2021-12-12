class VistaCategoria {
    static crearCard(categoria) {
        let $divColumna = document.createElement("div");
        $divColumna.classList.add('col', 's12', 'm6');

        $divColumna.innerHTML =`<div class="card-categoria">
                                    <h2 class="card-header">${categoria.getNombre()}</h2>
                                    <div class="card">
                                        <div class="d-flex">
                                            <div class="card-image d-flex">
                                                <div class="barra-de-color" style="background-color: ${categoria.getColor()}"></div>
                                                <i class="medium material-icons">${categoria.getIcono()}</i>
                                            </div>
                                            <div class="card-stacked">
                                                <div class="card-content">
                                                    <p>${categoria.getDescripcion()}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <small class="categoria-ejemplos">Ej: ${categoria.getEjemplos()}</small>
                                    </div>
                                </div>`;

        return $divColumna;
    }
}

export { VistaCategoria };