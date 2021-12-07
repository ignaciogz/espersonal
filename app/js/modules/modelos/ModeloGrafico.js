import { Categorias, Grafico, Pizarra, Usuario } from '../clases.js';

class ModeloGrafico {
    constructor() {
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

        const categorias = Categorias.get();

        const grafico = new Grafico('grafico-pizarra-seleccionada');
        grafico.obtenerInformacion(pizarra, categorias.getListado());
        grafico.graficarInformacion();

        return {
            tituloDePagina: 'Gráfico - Panel del usuario',
            grafico: {
                nombre: pizarra.fecha,
                canvas: grafico.canvasGrafico
            }
        };
    }
}

export { ModeloGrafico };