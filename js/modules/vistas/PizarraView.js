class PizarraView {
    static crear() {
        let $seccionPizarra = document.createElement("section");
        $seccionPizarra.classList.add('pizarra');

        $seccionPizarra.innerHTML = `<div class="row">
                                        <!-- Nombre de pizarra -->
                                        <div class="col s10 l12 valign-wrapper">
                                            <h1><div id="pizarra-nombre"></div></h1>
                                            <i class="small material-icons">dashboard_customize</i>
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
                                                        <!-- Aquí se agrega DINÁMICAMENTE -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col s6 m3 d-flex">
                                                <i class="small material-icons left">north_east</i>
                                                <div>
                                                    Total Ingresos
                                                    <div id="total-ingresos">
                                                        <!-- Aquí se agrega DINÁMICAMENTE -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col s6 m3 d-flex">
                                                <i class="small material-icons left">south_west</i>
                                                <div>
                                                    Total Egresos
                                                    <div id="total-egresos">
                                                        <!-- Aquí se agrega DINÁMICAMENTE -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col s6 m3 d-flex">
                                                <i class="small material-icons left">account_balance</i>
                                                <div>
                                                    Balance
                                                    <div id="balance">
                                                        <!-- Aquí se agrega DINÁMICAMENTE -->
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
                                    </div>`;

        return $seccionPizarra;
    }
}

export { PizarraView };