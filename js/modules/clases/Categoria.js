class Categoria {
    constructor(nombre, descripcion, icono) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.icono = icono;
    }

    static crearCard(nombre, descripcion, icono) {
        let $divColumna = document.createElement("div");
        $divColumna.classList.add('col', 's6', 'l4');

        $divColumna.innerHTML = `<h2 class="card-header">${nombre}</h2>
                                    <div class="card horizontal">
                                        <div class="card-image">
                                            <i class="medium material-icons right">${icono}</i>
                                        </div>
                                        <div class="card-stacked">
                                            <div class="card-content">
                                                <p>${descripcion}</p>
                                            </div>
                                        </div>
                                    </div>`;

        return $divColumna;
    }
}

export { Categoria };