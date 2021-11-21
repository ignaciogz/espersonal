class VistaMenu {
    static crearItem(itemDeMenu) {
        let $itemDeMenu = document.createElement("li");
        
        $itemDeMenu.innerHTML =`<a class="waves-effect waves-red" href="${itemDeMenu.link}">
                                    <i class="material-icons left">${itemDeMenu.icono}</i>${itemDeMenu.nombre}
                                </a>`;

        return $itemDeMenu;
    }
}

export { VistaMenu };