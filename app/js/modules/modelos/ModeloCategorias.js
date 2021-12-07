import { Categorias } from '../clases.js';

class ModeloCategorias {
    constructor() {
        const categorias = Categorias.get();

        return {
            tituloDePagina: 'Categorías - Panel del usuario',
            categorias: {
                cards: categorias.crearCards()
            }
        }
    }
}

export { ModeloCategorias };