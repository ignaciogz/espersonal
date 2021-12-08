import { Utilidades } from '../servicios.js';
import { Categorias, Formulario, Modal, Pizarra, Usuario } from '../clases.js';

class ModeloPizarra {
    constructor() {
        const categorias = Categorias.get();
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

        // CREANDO DINÁMICAMENTE -> Opciones del select categoría, de los formulario de agregar y editar item
        const opcionesSelectCategoria = Formulario.crearOpcionesSelectCategoria(categorias);

        // CREANDO DINÁMICAMENTE -> Modal con el formularios de agregar y editar item
        const $modalAgregarItem = Modal.crearConFormulario('Agregar Item', 'add', 'Agregar');
        const $modalEditarItem = Modal.crearConFormulario('Editar Item', 'edit', 'Editar');
        
        return {
            tituloDePagina: 'Pizarra - Panel del usuario',
            pizarra: {
                nombre: pizarra.fecha,
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
                editarItem: $modalEditarItem
            }
        };
    }
}

export { ModeloPizarra };