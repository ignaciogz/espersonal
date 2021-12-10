import { ManejadorDOM } from '../servicios.js';

class VistaCategorias {
    constructor(datos) {
        ManejadorDOM.tituloDelDocumento(datos.tituloDelDocumento);

        let $seccionCategorias = document.createElement("section");
        $seccionCategorias.classList.add('categorias');

        $seccionCategorias.innerHTML = `<div class="row">
                                            <div class="col s12 valign-wrapper">
                                                <h1>${datos.pagina.titulo}</h1>
                                                <i class="small material-icons">${datos.pagina.icono}</i>
                                            </div>
                                        </div>

                                        <div id="contenedor-cards-categorias" class="row">
                                            <!-- Aquí se agrega DINÁMICAMENTE -->
                                        </div>`;
        
        ManejadorDOM.agregarContenidoAlSubElemento($seccionCategorias, '#contenedor-cards-categorias', datos.categorias.cards);

        return $seccionCategorias;
    }
}

export { VistaCategorias };