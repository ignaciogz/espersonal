class VistaMenu {
    static crearItem(itemDeMenu) {
        let $itemDeMenu = document.createElement("li");
        
        $itemDeMenu.innerHTML =`<a class="waves-effect waves-red" href="${itemDeMenu.getLink()}">
                                    <i class="material-icons left">${itemDeMenu.getIcono()}</i>${itemDeMenu.getNombre()}
                                </a>`;

        return $itemDeMenu;
    }
}

export { VistaMenu };