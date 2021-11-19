import { Navegador } from '../igzframework.js';
import { Formulario, ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Categorias, Pizarra, Usuario } from '../clases.js';

import { ControladorApp } from './ControladorApp.js';

class ControladorPizarra {
    static ejecutar() {
        if (Usuario.estaLogeado()) {
            ControladorApp.inicializar();
            
            // [Al abrir la app la pizarra seleccionada será por defecto la del mes actual]
            const $pizarraSeleccionada = $('#pizarra-seleccionada');
            if (ManejadorDOM.existeEnDOM($pizarraSeleccionada)) {
                // CARGANDO DATOS predefinidos de forma ASÍNCRONA -> En localStorage [Si ya existe NO agrega]
                const pizarras = Pizarra.cargarJSON_pizarrasPredefinidas();

                pizarras.onReady.always(() => {
                    // MOSTRANDO -> La pizarra selecionada
                    const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
                    const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

                    const registrosDeItems = pizarra.crearRegistros();

                    ManejadorDOM.mostrarNombrePizarra(pizarra);
                    ManejadorDOM.agregar($pizarraSeleccionada, registrosDeItems);

                    ManejadorDOM.mostrarInformacionPizarra(pizarra);

                    // ASOCIANDO EVENTOS
                    ManejadorEventos.asociar('table .btn-edit', 'click', ManejadorEventos.getHandler_autocompletarFormEditarItem());
                    ManejadorEventos.asociar('table .btn-delete', 'click', ManejadorEventos.getHandler_eliminarItem());
                });

                // OBSERVANDO -> Cuando se agrega/edita/elimina un nuevo item a la pizarra seleccionada
                const observador_itemsDePizarra = new MutationObserver(ManejadorEventos.getHandler_actualizarCambiosEnPizarra());
                observador_itemsDePizarra.observe($pizarraSeleccionada[0], { childList: true, subtree: true });
            }

            // CREANDO DINÁMICAMENTE y de forma ASÍNCRONA -> Opciones del select categoría de los formularios
            const $selectCategoria = $('.contenedor-select-categoria select');
            if (ManejadorDOM.existeEnDOM($selectCategoria)) {
                const categorias = Categorias.get();
                
                categorias.onReady.always(() => {
                    const opcionesSelectCategoria = Formulario.crearOpcionesSelectCategoria(categorias);
                    ManejadorDOM.agregar($selectCategoria, opcionesSelectCategoria);
                });
            }

            // ASOCIANDO EVENTOS
            ManejadorEventos.asociar('#btn-agregar', 'click', ManejadorEventos.getHandler_resetearFormAgregarItem());
            ManejadorEventos.asociar('table th', 'click', ManejadorEventos.getHandler_reordenarTabla());

            ManejadorEventos.asociar('#form-agregar-item', 'submit', ManejadorEventos.getHandler_formAgregarItem());
            ManejadorEventos.asociar('#form-editar-item', 'submit', ManejadorEventos.getHandler_formEditarItem());
            ManejadorEventos.asociar('form .contenedor-radio-tipo input', 'change', ManejadorEventos.getHandler_toggleDisplaySelectCategoria());
        } else {
            Navegador.redireccionar("index.html");
        }
    }
}

export { ControladorPizarra as controlador };