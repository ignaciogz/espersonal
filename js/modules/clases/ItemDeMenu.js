class ItemDeMenu {
    constructor(icono, nombre, link) {
        this.icono = icono;
        this.nombre = nombre;
        this.link = link;
    }

    static crearItem(item) {
        let $itemDeMenu = document.createElement("li");
        
        $itemDeMenu.innerHTML = `   <a class="waves-effect waves-red" href="${item.link}">
                                        <i class="material-icons left">${item.icono}</i>${item.nombre}
                                    </a>`;

        return $itemDeMenu;
    }
}

export { ItemDeMenu };