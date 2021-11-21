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

    static getTipoDeItem(nombreTipoDeItem) {
        const fn_busqueda = Item.fn_tipoDeItem(nombreTipoDeItem);
        
        return Item.tiposDeItem.find(fn_busqueda);
    }

    static getIndice(itemID, items) {
        const fn_busqueda = Item.fn_itemBuscado(itemID);
        
        return items.findIndex(fn_busqueda);
    }

    static getItem(itemID, items) {     
        const fn_busqueda = Item.fn_itemBuscado(itemID);

        const datosDelItem = items.find(fn_busqueda);
        datosDelItem.categoria = Item.getValorDeCategoriaDeTipo(datosDelItem.tipo, datosDelItem.categoria);

        return new Item(datosDelItem.id, datosDelItem.tipo, datosDelItem.categoria, datosDelItem.nombre, datosDelItem.monto);
    }

    static getTipoDelIcono(icono) {
        const fn_busqueda = Item.fn_buscarIconoDeTipoDeItem(icono);
        
        const tipoDeItem = Item.tiposDeItem.find(fn_busqueda);
        
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

    static fn_buscarIconoDeTipoDeItem(icono) {
        return elemento => elemento.icono === icono;
    }

    static fn_itemBuscado(itemID) {
        return elemento => elemento.id === itemID;
    }

    static fn_tipoDeItem(nombreTipoDeItem) {
        return elemento => elemento.nombre === nombreTipoDeItem;
    }
}

export { Item };