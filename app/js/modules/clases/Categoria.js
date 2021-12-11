class Categoria {
    constructor(nombre, descripcion, icono, color) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.icono = icono;
        this.color = color;
    }

    // Métodos públicos
    getNombre() {
        return this.nombre;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getIcono() {
        return this.icono;
    }

    getColor() {
        return this.color;
    }
}

export { Categoria };