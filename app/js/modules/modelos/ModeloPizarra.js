import { Utilidades } from '../servicios.js';
import { Categorias, Formulario, Modal, Pizarra, Usuario } from '../clases.js';

class ModeloPizarra {
    constructor() {
        const usuarioLogeado = Usuario.obtenerUsuarioLogeado();
        const pizarra = Pizarra.obtenerPizarraDeUsuario(usuarioLogeado);

        const categorias = Categorias.get();
        const opcionesSelectCategoria = Formulario.crearOpcionesSelectCategoria(categorias);

        // CREANDO DINÁMICAMENTE -> Modal con el formularios de agregar y editar item
        const $modalAgregarItem = Modal.crearConFormulario('Agregar Item', 'add', 'Agregar');
        const $modalEditarItem = Modal.crearConFormulario('Editar Item', 'edit', 'Editar');
        
        return {
            tituloDePagina: 'Pizarra - Panel del usuario',
            pizarra: {
                nombre: pizarra.fecha,
                registros: pizarra.noEstaVacia() ? pizarra.crearRegistros() : null,
                cantidadDeItems: pizarra.getCantidadDeItems(),
                totalIngresos: Utilidades.formatearMonto(pizarra.getTotalIngresos()),
                totalEgresos: Utilidades.formatearMonto(pizarra.getTotalEgresos()),
                balance: Utilidades.formatearMonto(pizarra.getBalance())
            },
            selectCategoria: {
                opciones: opcionesSelectCategoria
            },
            modales: {
                agregarItem: $modalAgregarItem,
                editarItem: $modalEditarItem
            }
        };
    }
}

export { ModeloPizarra };