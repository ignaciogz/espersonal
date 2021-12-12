class Categoria {
    constructor(nombre, descripcion, ejemplos, icono, color) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ejemplos = ejemplos;
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

    getEjemplos() {
        return this.ejemplos;
    }

    getIcono() {
        return this.icono;
    }

    getColor() {
        return this.color;
    }
}

export { Categoria };