import { App, Observador } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos } from '../servicios.js';
import { Categorias, Formulario, Pizarra, Usuario } from '../clases.js';

class ModeloPizarra {
    constructor() {
        ManejadorDOM.tituloDePagina('Pizarra - Panel del usuario');

        // [Al abrir la app la pizarra seleccionada será por defecto la del mes actual]
        const $pizarraSeleccionada = $('#pizarra-seleccionada');
        if (ManejadorDOM.existeEnDOM($pizarraSeleccionada)) {
            // MOSTRANDO -> La pizarra selecionada
            const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
            const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

            const registrosDeItems = pizarra.crearRegistros();

            ManejadorDOM.mostrarNombrePizarra(pizarra);
            ManejadorDOM.agregar($pizarraSeleccionada, registrosDeItems);

            ManejadorDOM.mostrarInformacionPizarra(pizarra);    

            // OBSERVANDO -> Cuando se agrega/edita/elimina un nuevo item a la pizarra seleccionada
            Observador.escuchar($pizarraSeleccionada, ManejadorEventos.getHandler_actualizarCambiosEnPizarra());
        }

        // CREANDO DINÁMICAMENTE -> Opciones del select categoría de los formularios
        const $selectCategoria = $('.contenedor-select-categoria select');
        if (ManejadorDOM.existeEnDOM($selectCategoria)) {
            const categorias = Categorias.get();
            
            const opcionesSelectCategoria = Formulario.crearOpcionesSelectCategoria(categorias);
            ManejadorDOM.agregar($selectCategoria, opcionesSelectCategoria);
        }

        // ASOCIANDO EVENTOS
        ManejadorEventos.asociar('#btn-agregar', 'click', ManejadorEventos.getHandler_resetearFormAgregarItem());
        ManejadorEventos.asociar('table th', 'click', ManejadorEventos.getHandler_reordenarTabla());
        ManejadorEventos.asociar('table .btn-edit', 'click', ManejadorEventos.getHandler_autocompletarFormEditarItem());
        ManejadorEventos.asociar('table .btn-delete', 'click', ManejadorEventos.getHandler_eliminarItem());

        ManejadorEventos.asociar('#form-agregar-item', 'submit', ManejadorEventos.getHandler_formAgregarItem());
        ManejadorEventos.asociar('#form-editar-item', 'submit', ManejadorEventos.getHandler_formEditarItem());
        ManejadorEventos.asociar('form .contenedor-radio-tipo input', 'change', ManejadorEventos.getHandler_toggleDisplaySelectCategoria());

        // INICIALIZANDO COMPONENTES DE TERCEROS
        App.inicializarDependencia('Materialize');
    }
}

export { ModeloPizarra };