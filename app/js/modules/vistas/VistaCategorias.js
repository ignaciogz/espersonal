import { ManejadorDOM } from '../servicios.js';

class VistaCategorias {
    constructor(datos) {
        ManejadorDOM.tituloDelDocumento(datos.tituloDelDocumento);

        let $seccionCategorias = document.createElement("section");
        $seccionCategorias.classList.add('categorias');

        $seccionCategorias.innerHTML = `<div class="row">
                                            <div class="col s12">
                                                <!-- Título de la Página -->
                                                <section class="titulo-de-pagina valign-wrapper">
                                                    <h1>${datos.pagina.titulo}</h1>
                                                    <i class="small material-icons">${datos.pagina.icono}</i>
                                                </section>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col s12 p-0">
                                                <!-- Categorías -->
                                                <section class="categorias">
                                                    <div id="contenedor-cards-categorias">
                                                        <!-- Aquí se agrega DINÁMICAMENTE -->
                                                    </div>
                                                </section>
                                            </div>
                                        </div>`;
        
        ManejadorDOM.agregarContenidoAlSubElemento($seccionCategorias, '#contenedor-cards-categorias', datos.categorias.cards);

        return $seccionCategorias;
    }
}

export { VistaCategorias };