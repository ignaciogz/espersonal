class VistaCategorias {
    constructor() {
        let $seccionCategorias = document.createElement("section");
        $seccionCategorias.classList.add('categorias');

        $seccionCategorias.innerHTML = `<div class="row">
                                            <div class="col s10 l12 valign-wrapper">
                                                <h1>Categorías</h1>
                                                <i class="small material-icons">category</i>
                                            </div>
                                        </div>

                                        <div id="contenedor-cards-categorias" class="row">
                                            <!-- Aquí se agrega DINÁMICAMENTE -->
                                        </div>`;
        
        return $seccionCategorias;
    }
}

export { VistaCategorias };