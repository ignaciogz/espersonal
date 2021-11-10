import { Utilidades } from '../servicios.js';

class Item {
    constructor(tipo, categoria, nombre, monto) {
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
        } else {
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
                                        <a href="!#"><i class="btn-delete material-icons brown-text right">delete_forever</i></a>
                                        <a href="!#"><i class="btn-edit material-icons brown-text right">edit</i></a>
                                    </td>
                                    <td class="valor-${estiloDeMonto}">${Utilidades.formatearMonto(item.monto)}</td>`;

        return $registroItem;
    }
}

export { Item };