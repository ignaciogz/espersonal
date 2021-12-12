import { Utilidades } from '../servicios.js';
import { Categorias, Formulario, Menu, Modal, Pizarra, Usuario } from '../clases.js';

class ModeloPizarra {
    constructor() {
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);
        
        const categorias = Categorias.get();
        
        const menu = Menu.get();

        // CREANDO DINÁMICAMENTE -> Opciones del select categoría, de los formulario de agregar y editar item
        const opcionesSelectCategoria = Formulario.crearOpcionesSelectCategoria(categorias);

        // CREANDO DINÁMICAMENTE -> Modal con el formularios de agregar y editar item
        const $modalAgregarItem = Modal.crearConFormulario('Agregar Item', 'add', 'Agregar');
        const $modalEditarItem = Modal.crearConFormulario('Editar Item', 'edit', 'Editar');
        const $modalEliminarItem = Modal.crearConFormulario('Eliminar Item', 'delete_forever', 'Eliminar');
        
        return {
            tituloDelDocumento: 'Pizarra - Panel del usuario',
            pagina: {
                titulo: pizarra.fecha,
                icono: menu.getOpcion('Pizarra').icono,
            },
            pizarra: {
                registros: pizarra.estaVacia() ? null : pizarra.crearRegistros(),
                cantidadDeItems: pizarra.getCantidadDeItems(),
                totalIngresos: Utilidades.formatearMonto(pizarra.getTotalIngresos()),
                totalEgresos: Utilidades.formatearMonto(pizarra.getTotalEgresos()),
                balance: Utilidades.formatearMonto(pizarra.getBalance())
            },
            selects: {
                categoria: { opciones: opcionesSelectCategoria }
            },
            modales: {
                agregarItem: $modalAgregarItem,
                editarItem: $modalEditarItem,
                eliminarItem: $modalEliminarItem
            }
        };
    }
}

export { ModeloPizarra };