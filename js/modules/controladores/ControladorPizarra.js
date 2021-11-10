import { App, Navegador } from '../igzframework.js';
import { Formulario, ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Categorias, Pizarra, Usuario } from '../clases.js';

class ControladorPizarra {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            // CARGANDO DATOS predefinidos en localStorage [Si ya existe NO agrega]
            Pizarra.cargarJSON_pizarrasPredefinidas();

            // MOSTRANDO -> Nombre de usuario
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            ManejadorDOM.mostrarNombreDeUsuario(usuarioLogeado);

            // [Al abrir la app la pizarra seleccionada será por defecto la del mes actual]
            const $pizarraSeleccionada = $('#pizarra-seleccionada');
            if (ManejadorDOM.existeEnDOM($pizarraSeleccionada)) {
                // OBSERVANDO -> Cuando se agrega un nuevo item a la pizarra seleccionada
                const observador_itemAgregado = new MutationObserver(ManejadorEventos.getActualizarCambiosEnPizarra());
                observador_itemAgregado.observe($pizarraSeleccionada[0], { childList: true, subtree: true });

                // MOSTRANDO -> La pizarra selecionada
                const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

                const registrosDeItems = pizarra.crearRegistros();

                ManejadorDOM.mostrarNombrePizarra(pizarra);
                ManejadorDOM.agregar($pizarraSeleccionada, registrosDeItems);

                pizarra.actualizarInformacion();
                ManejadorDOM.mostrarInformacionPizarra(pizarra);
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select categoría del formulario de agregar item
            const $selectCategoria = $('#agregar-item-select-categoria');
            if (ManejadorDOM.existeEnDOM($selectCategoria)) {
                const categorias = Categorias.get();
                const opcionesSelectCategoria = Formulario.crearOpcionesSelectCategoria(categorias);
                ManejadorDOM.agregar($selectCategoria, opcionesSelectCategoria);
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select año del formulario de configuración
            const $selectAnio = $('#configuracion-select-anio');
            if (ManejadorDOM.existeEnDOM($selectAnio)) {
                const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
                const opcionesSelectAnio = Formulario.crearOpcionesSelectAnio(usuarioLogeado);
                ManejadorDOM.agregar($selectAnio, opcionesSelectAnio);
            }

            // ASOCIANDO EVENTOS
            ManejadorEventos.asociar('#form-agregar-item', 'submit', ManejadorEventos.getValidarFormAgregarItem());
            ManejadorEventos.asociar('input[name="agregar-item-radio-tipo"]', 'change', ManejadorEventos.getToggleDisplaySelectCategoria());
            ManejadorEventos.asociar('#btn-salir', 'click', ManejadorEventos.getCerrarApp());

            App.inicializarDependencia('Materialize');
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorPizarra as controlador };