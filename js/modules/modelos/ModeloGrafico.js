import { ManejadorDOM } from '../servicios.js';
import { Categorias, Grafico, Pizarra, Usuario } from '../clases.js';

class ModeloGrafico {
    constructor() {
        ManejadorDOM.tituloDePagina('Gráfico - Panel del usuario');

        const $canvasGrafico = $('#grafico-pizarra-seleccionada');
        if (ManejadorDOM.existeEnDOM($canvasGrafico)) {
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            ManejadorDOM.mostrarNombrePizarra(pizarra);
            
            const categorias = new Categorias();
            categorias.onReady().always(() => {
                    const grafico = new Grafico($canvasGrafico);
                
                    grafico.onReady().always(() => {
                            grafico.obtenerInformacion(pizarra, categorias.getListado());
                            grafico.graficarInformacion();
                    });            
            });
        }   
    }
}

export { ModeloGrafico };