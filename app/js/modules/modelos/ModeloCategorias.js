import { Categorias, Menu } from '../clases.js';

class ModeloCategorias {
    constructor() {
        const categorias = Categorias.get();

        const menu = Menu.get();

        return {
            tituloDelDocumento: 'Categorías - Panel del usuario',
            pagina: {
                titulo: 'Listado de categorías',
                icono: menu.getOpcion('Categorías').icono,
            },
            categorias: {
                cards: categorias.crearCards()
            }
        }
    }
}

export { ModeloCategorias };