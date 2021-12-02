class VistaGrafico {
    constructor() {
        let $seccionGrafico = document.createElement("section");
        $seccionGrafico.classList.add('grafico');

        $seccionGrafico.innerHTML = `<div class="row">
                                        <div class="col s10 l12 valign-wrapper">
                                            <h1><div id="pizarra-nombre"></div></h1>
                                            <i class="small material-icons">donut_large</i>
                                        </div>
                                    </div>

                                    <div class="row">
                                            <div class="col s12">
                                                <div class="chart-container" style="position: relative; height:250px; width:450px; margin: 0 auto">
                                                    <canvas id="grafico-pizarra-seleccionada"></canvas>
                                                </div>
                                            </div>
                                    </div>`;
        
        return $seccionGrafico;        
    }
}

export { VistaGrafico };