import { Utilidades } from '../servicios.js';
import { Item } from '../modelos.js';

class VistaItem {
    static crearRegistro(item) {
        let $registroItem = document.createElement("tr");

        const tipoDeItem = Item.getTipoDeItem(item.tipo);
        if (tipoDeItem.nombre === "Ingreso") {
            item.categoria = "----------";
        }

        $registroItem.innerHTML =  `<td><i class="material-icons left ${tipoDeItem.estilo_tipo} text-darken-2">${tipoDeItem.icono}</i></td>
                                    <td>${item.categoria}</td>
                                    <td>${item.nombre}</td>
                                    <td>
                                        <i data-item-id=${item.id} class="btn-delete material-icons brown-text right">delete_forever</i>
                                        <a class="modal-trigger" href="#modal-editar-item">
                                            <i data-item-id=${item.id} class="btn-edit material-icons brown-text right">edit</i>
                                        </a>
                                    </td>
                                    <td class="valor-${tipoDeItem.estilo_monto}">${Utilidades.formatearMonto(item.monto)}</td>`;

        return $registroItem;
    }
}

export { VistaItem };