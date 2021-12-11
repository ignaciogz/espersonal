import { Utilidades } from '../../servicios.js';
import { Item } from '../../clases.js';

class VistaItem {
    static crearRegistro(item) {
        let $registroItem = document.createElement("tr");

        const tipoDeItem = Item.getTipoDeItem(item.getTipo());
        if (tipoDeItem.nombre === "Ingreso") {
            const sinCategoria = "-".repeat(10);
            item.setCategoria(sinCategoria);
        }

        $registroItem.innerHTML =  `<td><i class="material-icons left ${tipoDeItem.estilo_tipo} text-darken-2">${tipoDeItem.icono}</i></td>
                                    <td>${item.getCategoria()}</td>
                                    <td>${item.getNombre()}</td>
                                    <td>
                                        <i data-item-id=${item.getID()} class="btn-delete material-icons brown-text right">delete_forever</i>
                                        <a class="modal-trigger" href="#modal-editar-item">
                                            <i data-item-id=${item.getID()} class="btn-edit material-icons brown-text right">edit</i>
                                        </a>
                                    </td>
                                    <td class="valor-${tipoDeItem.estilo_monto}">${Utilidades.formatearMonto(item.getMonto())}</td>`;

        return $registroItem;
    }
}

export { VistaItem };