class VistaCategoria {
    static crearCard(categoria) {
        let $divColumna = document.createElement("div");
        $divColumna.classList.add('col', 's6', 'l4');

        $divColumna.innerHTML =`<h2 class="card-header">${categoria.getNombre()}</h2>
                                <div class="card card-categoria horizontal">
                                    <div class="card-image">
                                        <i class="medium material-icons right">${categoria.getIcono()}</i>
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content">
                                            <p>${categoria.getDescripcion()}</p>
                                        </div>
                                    </div>
                                </div>`;

        return $divColumna;
    }
}

export { VistaCategoria };