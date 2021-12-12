import { ManejadorDOM } from '../servicios.js';

class VistaGrafico {
    constructor(datos) {
        ManejadorDOM.tituloDelDocumento(datos.tituloDelDocumento);
        
        let $seccionGrafico = document.createElement("section");
        $seccionGrafico.classList.add('grafico');

        $seccionGrafico.innerHTML = `<div class="row">
                                        <div class="col s12">
                                            <!-- Título de la Página -->
                                            <section class="titulo-de-pagina valign-wrapper">
                                                <h1>${datos.pagina.titulo}</h1>
                                                <i class="small material-icons">${datos.pagina.icono}</i>
                                            </section>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col s12">
                                            <!-- Gráfico de Egresos -->
                                            <section id="contenedor-grafico-egresos" class="valign-wrapper flex-sm-column">
                                                <div class="col ms-0 p-0 s8 m5 l5 xl4">
                                                    <div id="grafico-egresos" class="chart-container">
                                                        
                                                    </div>
                                                </div>
                                                <div class="col p-0 s12 m12 l7 xl8">
                                                    <div class="col s12">
                                                        <h2>${datos.grafico.nombre}:</h2>
                                                    </div>
                                                    <div id="etiquetas-grafico-egresos" class="col s12 legend-container">

                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>`;
        
        if(datos.grafico.canvas) {
            ManejadorDOM.agregarContenidoAlSubElemento($seccionGrafico, '#grafico-egresos', datos.grafico.canvas);
            ManejadorDOM.agregarContenidoAlSubElemento($seccionGrafico, '#etiquetas-grafico-egresos', datos.grafico.info);
        } else {
            const infoGraficoVacio = 'Debe agregar items de tipo egreso dentro de la <a href="#/pizarra">pizarra</a>, para poder generar el gráfico.';
            ManejadorDOM.agregarInfoGraficoVacio($seccionGrafico, '#contenedor-grafico-egresos', infoGraficoVacio);
        }

        return $seccionGrafico;
    }
}

export { VistaGrafico };