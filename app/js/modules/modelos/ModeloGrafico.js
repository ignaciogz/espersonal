import { Categorias, Grafico, Menu, Pizarra, Usuario } from '../clases.js';

class ModeloGrafico {
    constructor() {
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

        const categorias = Categorias.get();

        const menu = Menu.get();

        let canvasGrafico, infoGrafico;
        if(pizarra.tieneDatosParaGraficar()) {
            const grafico = new Grafico('grafico-pizarra-seleccionada');
            grafico.cargarInformacion(pizarra, categorias.getListado());
            
            canvasGrafico = grafico.graficarInformacion();
            infoGrafico = grafico.crearInformacionAsociada();
        }

        return {
            tituloDelDocumento: 'Gráfico - Panel del usuario',
            pagina: {
                titulo: 'Gráfico de egresos',
                icono: menu.getOpcion('Gráfico').getIcono(),
            },
            grafico: {
                nombre: pizarra.fecha,
                canvas: canvasGrafico ? canvasGrafico : null,
                info: infoGrafico ? infoGrafico : null
            }
        };
    }
}

export { ModeloGrafico };