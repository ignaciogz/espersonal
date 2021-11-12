import { Utilidades } from '../servicios.js';

class Item {
    constructor(id, tipo, categoria, nombre, monto) {
        this.id = id;
        this.tipo = tipo;
        this.categoria = categoria;
        this.nombre = nombre;
        this.monto = monto;
    }

    static crearRegistro(item) {
        let $registroItem = document.createElement("tr");
        let estiloTipoDeItem;
        let iconoTipoDeItem;
        let estiloDeMonto;

        if (item.tipo === "Ingreso") {
            estiloTipoDeItem = "green-text";
            iconoTipoDeItem = "north_east";
            estiloDeMonto = "positivo";
            item.categoria = "----------";
        } 
        
        if (item.tipo === "Egreso") {
            estiloTipoDeItem = "red-text";
            iconoTipoDeItem = "south_west";
            estiloDeMonto = "negativo";
        }

        $registroItem.innerHTML = `<td>
                                        <i class="material-icons left ${estiloTipoDeItem} text-darken-2">${iconoTipoDeItem}</i>
                                    </td>
                                    <td>${item.categoria}</td>
                                    <td>${item.nombre}</td>
                                    <td>
                                        <i data-item-id=${item.id} class="btn-delete material-icons brown-text right">delete_forever</i>
                                        <a class="modal-trigger" href="#modal-editar-item">
                                            <i data-item-id=${item.id} class="btn-edit material-icons brown-text right">edit</i>
                                        </a>
                                    </td>
                                    <td class="valor-${estiloDeMonto}">${Utilidades.formatearMonto(item.monto)}</td>`;

        return $registroItem;
    }

    static getIndice(itemID, items) {
        function itemBuscado(elemento) {
            return elemento.id === itemID;
        }

        return items.findIndex(itemBuscado);
    }

    static getItem(itemID, items) {
        function itemBuscado(elemento) {
            return elemento.id === itemID;
        }
        
        const datosDelItem = items.find(itemBuscado);

        return new Item(datosDelItem.id, datosDelItem.tipo, datosDelItem.categoria, datosDelItem.nombre, datosDelItem.monto);
    }
}

export { Item };