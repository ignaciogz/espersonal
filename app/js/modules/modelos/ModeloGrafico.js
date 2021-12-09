import { Categorias, Grafico, Menu, Pizarra, Usuario } from '../clases.js';

class ModeloGrafico {
    constructor() {
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

        const categorias = Categorias.get();

        const menu = Menu.get();

        const grafico = new Grafico('grafico-pizarra-seleccionada');
        grafico.obtenerInformacion(pizarra, categorias.getListado());
        grafico.graficarInformacion();

        return {
            tituloDelDocumento: 'Gráfico - Panel del usuario',
            pagina: {
                titulo: pizarra.fecha,
                icono: menu.getOpcion('Gráfico').icono,
            },
            grafico: {
                nombre: 'Gráfico de egresos',
                canvas: grafico.canvasGrafico
            }
        };
    }
}

export { ModeloGrafico };