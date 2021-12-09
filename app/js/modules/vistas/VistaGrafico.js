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
                                            <div class="chart-container valign-wrapper" style="position: relative; height:300px; width:450px; margin: 0 auto">
                                                <!-- Aquí se agrega DINÁMICAMENTE -->
                                            </div>
                                        </div>
                                    </div>`;
                                    
        ManejadorDOM.agregarContenidoAlSubElemento($seccionGrafico, '.chart-container', datos.grafico.canvas);

        return $seccionGrafico;
    }
}

export { VistaGrafico };