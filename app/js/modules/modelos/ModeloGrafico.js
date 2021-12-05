import { ManejadorExcepcion } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Categorias, Grafico, Pizarra, Usuario } from '../clases.js';

class ModeloGrafico {
    constructor() {
        try {
            ManejadorDOM.tituloDePagina('Gráfico - Panel del usuario');

            const $canvasGrafico = $('#grafico-pizarra-seleccionada');
            if (ManejadorDOM.existeEnDOM($canvasGrafico)) {
                const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
                const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

                ManejadorDOM.mostrarNombrePizarra(pizarra);
                
                const categorias = Categorias.get();
                
                const grafico = new Grafico($canvasGrafico);
                // Consumo de forma ASÍNCRONA, el JSON de: configuración del grafico.
                grafico.onReady().always(() => {
                        grafico.obtenerInformacion(pizarra, categorias.getListado());
                        grafico.graficarInformacion();
                });
            }   
        } catch(e) {
            ManejadorExcepcion.generarLOG(e);
        }
    }
}

export { ModeloGrafico };