import { Utilidades } from '../servicios.js';

class Item {
    constructor(id, tipo, categoria, nombre, monto) {
        this.id = id;
        this.tipo = tipo;
        this.categoria = categoria;
        this.nombre = nombre;
        this.monto = monto;
    }

    static tiposDeItem = [
        {
            "nombre": "Ingreso",
            "icono": "north_east",
            "estilo_tipo": "green-text",
            "estilo_monto": "positivo",
        },
        {
            "nombre": "Egreso",
            "icono": "south_west",
            "estilo_tipo": "red-text",
            "estilo_monto": "negativo",
        }
    ]

    static crearRegistro(item) {
        let $registroItem = document.createElement("tr");

        const tipoDeItem = Item.getTipoDeItem(item.tipo);
        if (tipoDeItem.nombre === "Ingreso") {
            item.categoria = "----------";
        }

        $registroItem.innerHTML =  `<td>
                                        <i class="material-icons left ${tipoDeItem.estilo_tipo} text-darken-2">${tipoDeItem.icono}</i>
                                    </td>
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

    static getTipoDeItem(nombreTipoDeItem) {
        function tipoDeItem(elemento) {
            return elemento.nombre === nombreTipoDeItem;           
        }
        
        return Item.tiposDeItem.find(tipoDeItem);
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

        datosDelItem.categoria = Item.getValorDeCategoriaDeTipo(datosDelItem.tipo, datosDelItem.categoria);

        return new Item(datosDelItem.id, datosDelItem.tipo, datosDelItem.categoria, datosDelItem.nombre, datosDelItem.monto);
    }

    static getTipoDelIcono(icono) {
        function buscarIconoDeTipoDeItem(elemento) {
            return elemento.icono === icono;           
        }
        
        const tipoDeItem = Item.tiposDeItem.find(buscarIconoDeTipoDeItem);
        
        return tipoDeItem.nombre;
    }

    static getValorDeCategoriaDeTipo(tipo, categoria) {
        switch (tipo) {
            case "Ingreso":
                return "Sin categoría";
            case "Egreso":
                return categoria;
        }
    }
}

export { Item };