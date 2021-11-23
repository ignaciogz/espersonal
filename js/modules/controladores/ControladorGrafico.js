import { Navegador } from '../igzframework.js';
import { ManejadorDOM } from '../servicios.js';
import { Categorias, Grafico, Pizarra, Usuario } from '../modelos.js';

import { ControladorApp } from './ControladorApp.js';

class ControladorGrafico {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            ControladorApp.inicializar();

            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            ManejadorDOM.mostrarNombrePizarra(pizarra);


            const categorias = Categorias.get();
            categorias.onReady().always(() => {
                    const $canvasGrafico = $('#grafico-pizarra-seleccionada');
                    if (ManejadorDOM.existeEnDOM($canvasGrafico)) {
                        const grafico = Grafico.get($canvasGrafico);

                        grafico.onReady().always(() => {
                                grafico.generarInformacion(pizarra, categorias.getListado());
                                grafico.graficar();
                        });
                    }
            });
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorGrafico as controlador };