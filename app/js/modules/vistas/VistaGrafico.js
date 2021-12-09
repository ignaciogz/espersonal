import { ManejadorDOM } from '../servicios.js';

class VistaGrafico {
    constructor(datos) {
        ManejadorDOM.tituloDelDocumento(datos.tituloDelDocumento);
        
        let $seccionGrafico = document.createElement("section");
        $seccionGrafico.classList.add('grafico');

        $seccionGrafico.innerHTML = `<div class="row">
                                        <div class="col s10 l12 valign-wrapper">
                                            <h1>
                                                <div id="pizarra-nombre">${datos.pagina.titulo}</div>
                                            </h1>
                                            <i class="small material-icons">${datos.pagina.icono}</i>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col s12">
                                            <h2>${datos.grafico.nombre}</h2>
                                            <div id="contenedor-grafico-egresos">
                                                
                                            </div>
                                        </div>
                                    </div>`;
        
        if(datos.grafico.canvas) {
            let $grafico = document.createElement("div");
            $grafico.classList.add('chart-container', 'valign-wrapper');
            
            $grafico.innerHTML =    `<div class="chart-container valign-wrapper">
                                        <!-- Aquí se agrega DINÁMICAMENTE -->
                                    </div>`

            ManejadorDOM.agregarContenidoAlSubElemento($grafico, '.chart-container', datos.grafico.canvas);
            ManejadorDOM.agregarContenidoAlSubElemento($seccionGrafico, '#contenedor-grafico-egresos', $grafico);
        } else {
            ManejadorDOM.agregarInfoGraficoVacio($seccionGrafico, '#contenedor-grafico-egresos');
        }

        return $seccionGrafico;
    }
}

export { VistaGrafico };