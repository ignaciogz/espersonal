class VistaEtiqueta {
    static crear(coloresDeFondo, nombre, porcentaje) {
        let $etiqueta =  document.createElement("div");
        $etiqueta.classList.add('col', 's6', 'xl4', 'valign-wrapper');

        $etiqueta.innerHTML = `<div class="barra-de-color" style="background-color: ${coloresDeFondo}"></div>
                                <div><b>${nombre}</b> <br/> ${porcentaje}%</div>`;
        
        return $etiqueta;
    }
}

export { VistaEtiqueta };