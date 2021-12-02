import { ManejadorDOM } from '../servicios.js';
import { Categorias } from '../clases.js';

class ModeloCategorias {
    constructor() {
        ManejadorDOM.tituloDePagina('Categorías - Panel del usuario');

         //  CREANDO DINÁMICAMENTE  y de forma ASÍNCRONA -> Cards de categorías
         const $cardsCategorias = $('#contenedor-cards-categorias');
         if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
             const categorias = new Categorias();

             categorias.onReady().always(() => {
                     const cardsCategorias = categorias.crearCards();
                     ManejadorDOM.agregar($cardsCategorias, cardsCategorias);
             });
         }
    }
}

export { ModeloCategorias };