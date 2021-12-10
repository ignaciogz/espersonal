import { ManejadorDOM } from '../servicios.js';

class VistaGrafico {
    constructor(datos) {
        ManejadorDOM.tituloDelDocumento(datos.tituloDelDocumento);
        
        let $seccionGrafico = document.createElement("section");
        $seccionGrafico.classList.add('grafico');

        $seccionGrafico.innerHTML = `<div class="row">
                                        <div class="col s12 valign-wrapper">
                                            <h1>
                                                <div id="pizarra-nombre">${datos.pagina.titulo}</div>
                                            </h1>
                                            <i class="small material-icons">${datos.pagina.icono}</i>
                                        </div>
                                    </div>

                                    <div class="row valign-wrapper flex-s-column">
                                        <div class="col s8 ml-0 m5 xl4">
                                            <div class="chart-container">
                                                
                                            </div>
                                        </div>
                                        <div class="col s12 m7 xl8">
                                            <div class="col s12">
                                                <h2>${datos.grafico.nombre}:</h2>
                                            </div>
                                            <div class="contenedor-etiquetas">

                                            </div>
                                        </div>
                                    </div>`;
        
        if(datos.grafico.canvas) {
            ManejadorDOM.agregarContenidoAlSubElemento($seccionGrafico, '.chart-container', datos.grafico.canvas);
            ManejadorDOM.agregarContenidoAlSubElemento($seccionGrafico, '.contenedor-etiquetas', datos.grafico.info);
        } else {
            ManejadorDOM.agregarInfoGraficoVacio($seccionGrafico, '#contenedor-grafico-egresos');
        }

        return $seccionGrafico;
    }
}

export { VistaGrafico };