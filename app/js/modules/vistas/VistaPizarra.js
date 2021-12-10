import { App, Observador } from '../igzframework.js';
import { ManejadorDOM, ManejadorEventos, Validador } from '../servicios.js';

class VistaPizarra {
    constructor(datos) {
        ManejadorDOM.tituloDelDocumento(datos.tituloDelDocumento);

        let $seccionPizarra = document.createElement("section");
        $seccionPizarra.classList.add('pizarra');

        $seccionPizarra.innerHTML = `<div class="row">
                                        <!-- Nombre de pizarra -->
                                        <div class="col s12 valign-wrapper">
                                            <h1>
                                                <div id="pizarra-nombre">${datos.pagina.titulo}</div>
                                            </h1>
                                            <i class="small material-icons">${datos.pagina.icono}</i>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <!-- Info de pizarra -->
                                        <section class="pizarra-informacion">
                                            <div class="col s6 m3 d-flex">
                                                <i class="small material-icons left">flag</i>
                                                <div>
                                                    Total de items
                                                    <div id="total-de-items">
                                                        ${datos.pizarra.cantidadDeItems}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col s6 m3 d-flex">
                                                <i class="small material-icons left">north_east</i>
                                                <div>
                                                    Total Ingresos
                                                    <div id="total-ingresos">
                                                        ${datos.pizarra.totalIngresos}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col s6 m3 d-flex">
                                                <i class="small material-icons left">south_west</i>
                                                <div>
                                                    Total Egresos
                                                    <div id="total-egresos">
                                                        ${datos.pizarra.totalEgresos}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col s6 m3 d-flex">
                                                <i class="small material-icons left">account_balance</i>
                                                <div>
                                                    Balance
                                                    <div id="balance">
                                                        ${datos.pizarra.balance}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div class="row">
                                        <!-- Pizarra correspondiente a la fecha -->
                                        <div class="col s12">
                                            <table class="highlight">
                                                <thead>
                                                <tr>
                                                    <th>Tipo</th>
                                                    <th>Categoría</th>
                                                    <th>Nombre</th>
                                                    <th></th>
                                                    <th>Monto</th>
                                                </tr>
                                                </thead>

                                                <tbody id="pizarra-seleccionada">
                                                    <!-- Aquí se agrega DINÁMICAMENTE -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                    <!-- Btn flotante de la pizarra -->
                                    <div id="btn-agregar" class="btn-flotante">
                                        <a class="waves-effect waves-red btn-large btn-floating pulse brown modal-trigger" href="#modal-agregar-item"><i class="material-icons">add</i></a>
                                    </div>
                                        

                                    <!-- Modales -->`;
        
        // AGREGANDO -> Modales de agregar y editar item
        ManejadorDOM.agregar($seccionPizarra, datos.modales.agregarItem);
        ManejadorDOM.agregar($seccionPizarra, datos.modales.editarItem);

        // CARGANDO -> Opciones a los select categoría
        ManejadorDOM.agregarContenidoAlSubElemento($seccionPizarra, '.contenedor-select-categoria select', datos.selects.categoria.opciones);

        // AGREGANDO -> Los registros a la pizarra seleccionada
        if (datos.pizarra.registros) {
            ManejadorDOM.agregarContenidoAlSubElemento($seccionPizarra, '#pizarra-seleccionada', datos.pizarra.registros);

            // ASOCIANDO EVENTOS
            ManejadorEventos.asociarAlSubElemento($seccionPizarra, 'table .btn-edit', 'click', ManejadorEventos.getHandler("resetearFormEditarItem"));
            ManejadorEventos.asociarAlSubElemento($seccionPizarra, 'table .btn-edit', 'click', ManejadorEventos.getHandler("autocompletarFormEditarItem"));
            ManejadorEventos.asociarAlSubElemento($seccionPizarra, 'table .btn-delete', 'click', ManejadorEventos.getHandler("eliminarItem"));
        } else {
            ManejadorDOM.agregarInfoPizarraVacia($seccionPizarra);
        }
        
        // OBSERVANDO -> Cuando se agrega/edita/elimina un nuevo item a la pizarra seleccionada
        Observador.escucharAlSubElemento($seccionPizarra, '#pizarra-seleccionada', ManejadorEventos.getHandler("actualizarCambiosEnPizarra"));

        // ACTIVO VALIDACIONES
        Validador.validarCamposDelFormulario($seccionPizarra, '#form-agregar-item');
        Validador.validarCamposDelFormulario($seccionPizarra, '#form-editar-item');

        // ASOCIANDO EVENTOS
        ManejadorEventos.asociarAlSubElemento($seccionPizarra, '#btn-agregar', 'click', ManejadorEventos.getHandler("resetearFormAgregarItem"));
        ManejadorEventos.asociarAlSubElemento($seccionPizarra, 'table th', 'click', ManejadorEventos.getHandler("reordenarTabla"));

        ManejadorEventos.asociarAlSubElemento($seccionPizarra, '#form-agregar-item', 'submit', ManejadorEventos.getHandler("formAgregarItem"));
        ManejadorEventos.asociarAlSubElemento($seccionPizarra, '#form-editar-item', 'submit', ManejadorEventos.getHandler("formEditarItem"));
        ManejadorEventos.asociarAlSubElemento($seccionPizarra, 'form .contenedor-radio-tipo input', 'change', ManejadorEventos.getHandler("toggleDisplaySelectCategoria"));

        ManejadorEventos.asociarAlSubElemento($seccionPizarra, '.modal-close', 'click', ManejadorEventos.getHandler("cerrarModal"));

        // INICIALIZANDO COMPONENTES DE TERCEROS
        App.inicializarDependencia('Materialize');

        return $seccionPizarra;
    }
}

export { VistaPizarra };