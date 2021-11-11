import { App, Navegador } from '../igzframework.js';
import { Formulario, ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Categorias, Pizarra, Usuario } from '../clases.js';

class ControladorCategorias {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            // CARGANDO DATOS predefinidos en localStorage [Si ya existe NO agrega]
            Pizarra.cargarJSON_pizarrasPredefinidas();

            // MOSTRANDO -> Nombre de usuario
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            ManejadorDOM.mostrarNombreDeUsuario(usuarioLogeado);

            //  CREANDO DINÁMICAMENTE -> Cards de categorías
            const $cardsCategorias = $('#contenedor-cards-categorias');
            if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
                const categorias = Categorias.get();
                const cardsCategorias = categorias.crearCards();
                ManejadorDOM.agregar($cardsCategorias, cardsCategorias);
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select año del formulario de configuración
            const $selectAnio = $('#configuracion-select-anio');
            if (ManejadorDOM.existeEnDOM($selectAnio)) {
                const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);
                ManejadorDOM.agregar($selectAnio, opcionesSelectAnio);
            }

            // ASOCIANDO EVENTOS
            ManejadorEventos.asociar('#btn-salir', 'click', ManejadorEventos.getCerrarApp());

            // INICIALIZANDO COMPONENTES DE TERCEROS
            App.inicializarDependencia('Materialize');
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorCategorias as controlador };