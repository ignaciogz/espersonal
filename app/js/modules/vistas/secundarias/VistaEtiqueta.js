class VistaEtiqueta {
    static crear(color, nombre, porcentaje, icono) {
        let $etiqueta =  document.createElement("div");
        $etiqueta.classList.add('col', 's6', 'm4', 'l6', 'xl5', 'p-0', 'valign-wrapper');

        $etiqueta.innerHTML =  `<div class="barra-de-color" style="background-color: ${color}"></div>
                                <div class="valign-wrapper flex-sm-column flex-sm-align-start">
                                    <i class="small material-icons">${icono}</i>
                                    <div class="etiqueta-info">
                                        <b>${nombre}</b> 
                                        <br/>${porcentaje}%
                                    </div>
                                </div>`;
        
        return $etiqueta;
    }
}

export { VistaEtiqueta };