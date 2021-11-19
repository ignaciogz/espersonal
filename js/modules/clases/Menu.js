import { Ajax } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { JSON_menu } from '../json.js';
import { ItemDeMenu } from '../clases.js';

class Menu {
    constructor() {
        this.opciones = new Array();
        this.onReady = this.cargarJSON_menu();
    }

    static get() {
        if (Menu.instancia instanceof Menu) {
            return Menu.instancia;
        }

        return Menu.instancia = new Menu();
    }

    // Métodos privados
    setOpcion(valor) {
        this.opciones.push(valor);
    }

    cargarJSON_menu() {
        const _this = this;

        return Ajax.getJQXHR(JSON_menu)
                   .done(Menu.fn_cargarMenu().bind(_this));
        
    }

    // Métodos públicos
    getOpciones() {
        return this.opciones;
    }

    crearItems() {
        const fragmento = ManejadorDOM.crearFragmento();

        for (const opcion of this.getOpciones()) {
            let itemDeMenu = ItemDeMenu.crearItem(opcion);
            ManejadorDOM.agregar(fragmento, itemDeMenu);
        }

        return fragmento;
    }

    static fn_cargarMenu() {
        return function(data) {
            for (const item of data) {
                const opcion = new ItemDeMenu(item.icono, item.nombre, item.link);
                this.setOpcion(opcion);
            }
        }
    }
}

export { Menu };