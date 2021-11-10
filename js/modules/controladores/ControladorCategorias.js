import { Navegador } from '../igzframework.js';
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
            const $cardsCategorias = document.getElementById('contenedor-cards-categorias');
            if (ManejadorDOM.existeEnDOM($cardsCategorias)) {
                const categorias = Categorias.get();
                const cardsCategorias = categorias.crearCards();
                ManejadorDOM.agregar($cardsCategorias, cardsCategorias);
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select año del formulario de configuración
            const $selectAnio = document.getElementById('configuracion-select-anio');
            if (ManejadorDOM.existeEnDOM($selectAnio)) {
                const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);
                ManejadorDOM.agregar($selectAnio, opcionesSelectAnio);
            }

            // ASOCIANDO EVENTO -> A formulario de configuración
            // ASOCIANDO EVENTO -> A barra lateral
            const $btnSalir = document.getElementById('btn-salir');
            if (ManejadorDOM.existeEnDOM($btnSalir)) {
                $btnSalir.addEventListener('click', ManejadorEventos.cerrarApp());
            }

            // INICIALIZO componentes de Materialize
            M.AutoInit();
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorCategorias as controlador };