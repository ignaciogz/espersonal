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

                                    <div id="contenedor-grafico-egreso" class="row valign-wrapper flex-s-column">
                                        <div class="col ms-0 s8 m4 l5 xl4">
                                            <div id="grafico-egresos" class="chart-container">
                                                
                                            </div>
                                        </div>
                                        <div class="col s12 m8 l7 xl8">
                                            <div class="col s12">
                                                <h2>${datos.grafico.nombre}:</h2>
                                            </div>
                                            <div id="etiquetas-grafico-egresos" class="col s12 legend-container">

                                            </div>
                                        </div>
                                    </div>`;
        
        if(datos.grafico.canvas) {
            ManejadorDOM.agregarContenidoAlSubElemento($seccionGrafico, '#grafico-egresos', datos.grafico.canvas);
            ManejadorDOM.agregarContenidoAlSubElemento($seccionGrafico, '#etiquetas-grafico-egresos', datos.grafico.info);
        } else {
            const infoGraficoVacio = 'Debe agregar items de tipo egreso dentro de la <a href="#/pizarra">pizarra</a>, para poder generar el gráfico.';
            ManejadorDOM.agregarInfoGraficoVacio($seccionGrafico, '#contenedor-grafico-egreso', infoGraficoVacio);
        }

        return $seccionGrafico;
    }
}

export { VistaGrafico };