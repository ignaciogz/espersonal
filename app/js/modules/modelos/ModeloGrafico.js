import { Categorias, Grafico, Menu, Pizarra, Usuario } from '../clases.js';

class ModeloGrafico {
    constructor() {
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

        const categorias = Categorias.get();

        const menu = Menu.get();

        debugger
        let grafico = null;
        if(pizarra.tieneDatosParaGraficar()) {
            grafico = new Grafico('grafico-pizarra-seleccionada');
            grafico.obtenerInformacion(pizarra, categorias.getListado());
            grafico.graficarInformacion();
        }

        return {
            tituloDelDocumento: 'Gráfico - Panel del usuario',
            pagina: {
                titulo: pizarra.fecha,
                icono: menu.getOpcion('Gráfico').icono,
            },
            grafico: {
                nombre: 'Gráfico de egresos',
                canvas: grafico ? grafico.canvasGrafico : null
            }
        };
    }
}

export { ModeloGrafico };