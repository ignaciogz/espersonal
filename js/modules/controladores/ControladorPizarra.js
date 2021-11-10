import { Navegador } from '../igzframework.js';
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
            const $pizarraSeleccionada = document.getElementById('pizarra-seleccionada');
            if (ManejadorDOM.existeEnDOM($pizarraSeleccionada)) {
                // MOSTRANDO -> La pizarra selecionada
                const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

                const registrosDeItems = pizarra.crearRegistros();

                ManejadorDOM.mostrarNombrePizarra(pizarra);
                ManejadorDOM.agregar($pizarraSeleccionada, registrosDeItems);

                pizarra.actualizarInformacion();
                ManejadorDOM.mostrarInformacionPizarra(pizarra);

                // OBSERVANDO -> Cuando se agrega un nuevo item a la pizarra seleccionada
                const observador_nuevoItemAgregado = new MutationObserver(ManejadorEventos.actualizarInformacionPizarra());
                observador_nuevoItemAgregado.observe($pizarraSeleccionada, { childList: true, subtree: true });
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select categoría del formulario de agregar item
            const $selectCategoria = document.getElementById('agregar-item-select-categoria');

            if (ManejadorDOM.existeEnDOM($selectCategoria)) {
                const categorias = Categorias.get();
                const opcionesSelectCategoria = Formulario.crearOpcionesSelectCategoria(categorias);
                ManejadorDOM.agregar($selectCategoria, opcionesSelectCategoria);
            }

            // ASOCIANDO EVENTO -> A cada botón de radio del formulario de agregar item
            const $radiosTipoDeItem = document.querySelectorAll('input[name="agregar-item-radio-tipo"]');
            for (const $radio of $radiosTipoDeItem) {
                if (ManejadorDOM.existeEnDOM($radio)) {
                    $radio.addEventListener('change', ManejadorEventos.toggleDisplaySelectCategoria());
                }
            }

            // ASOCIANDO EVENTO -> A formulario de agregar item
            const $formAgregarItem = document.getElementById('form-agregar-item');
            if (ManejadorDOM.existeEnDOM($formAgregarItem)) {
                $formAgregarItem.addEventListener('submit', ManejadorEventos.validarFormAgregarItem());
            }

            // CREANDO DINÁMICAMENTE -> Opciones del select año del formulario de configuración
            const $selectAnio = document.getElementById('configuracion-select-anio');
            if (ManejadorDOM.existeEnDOM($selectAnio)) {
                const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
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

export { ControladorPizarra as controlador };