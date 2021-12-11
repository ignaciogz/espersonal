class ItemDeMenu {
    constructor(icono, nombre, link) {
        this.icono = icono;
        this.nombre = nombre;
        this.link = link;
    }

    // Métodos públicos
    getIcono() {
        return this.icono;
    }

    getNombre() {
        return this.nombre;
    }

    getLink() {
        return this.link;
    }
}

export { ItemDeMenu };