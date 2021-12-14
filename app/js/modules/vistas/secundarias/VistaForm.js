import { Validador } from '../../servicios.js'

class VistaForm {
    static #crearFormItem(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="input-field col s12">
                                                <input id="${identificador}-nombre" type="text" title="Debe comenzar con una letra o número. Sólo se permiten: letras, números, espacios en blanco, comas y puntos" required pattern=${Validador.regex.nombreItem} />
                                                <label for="${identificador}-nombre">Nombre</label>
                                            </div>

                                            <div class="input-field col s12">
                                                <p class="radio-header">
                                                    Seleccione el tipo de item:
                                                </p>
                                                <p class="contenedor-radio-tipo">
                                                    <label><input class="with-gap" name="${identificador}-radio-tipo" type="radio" value="Ingreso" checked /><span>Ingreso</span></label>
                                                </p>
                                                <p class="contenedor-radio-tipo">
                                                    <label><input class="with-gap" name="${identificador}-radio-tipo" type="radio" value="Egreso" /><span>Egreso</span></label>
                                                </p>
                                            </div>
                                            
                                            <div class="contenedor-select-categoria input-field select-container col s12">
                                                <select id="${identificador}-select-categoria">
                                                    <option disabled>- Categoría -</option>
                                                    <!-- Aquí se agrega DINÁMICAMENTE -->
                                                </select>
                                                <label for="${identificador}-select-categoria">Seleccione una categoría:</label>
                                            </div>

                                            <div class="input-field col s12">
                                                <input id="${identificador}-monto" type="text" title="Deben ser números. Máximo 2 decimales" required pattern=${Validador.regex.montoItem}>
                                                <label for="${identificador}-monto">Monto</label>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }

    static crearFormAcceso(identificador, nombreBtnPrincipal, nombreBtnSecundario) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="error red-text center-align">
                                                <div id="error-${identificador}"></div>
                                            </div>
                                            <div class="row">
                                                <div class="input-field col s12 l6">
                                                    <input id="${identificador}-usuario" type="text" required>
                                                    <label for="${identificador}-usuario">Usuario</label>
                                                </div>
                                            
                                                <div class="input-field col s12 l6">
                                                    <input id="${identificador}-contrasena" type="password" required>
                                                    <label for="${identificador}-contrasena">Contraseña</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col s12">
                                                    <button class="btn waves-effect waves-red brown" type="submit" name="action">${nombreBtnPrincipal.toUpperCase()}
                                                        <i class="material-icons left">login</i>
                                                    </button>
                                                    <a class="waves-effect btn-flat modal-trigger" href="#modal-${nombreBtnSecundario.toLowerCase()}">${nombreBtnSecundario}</a>
                                                </div>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }

    static crearFormAgregarItem(identificador) {
        return VistaForm.#crearFormItem(identificador);
    }

    static crearFormConfiguracion(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="input-field select-container col s12 l6">
                                                <select id="${identificador}-select-anio" required>
                                                    <option disabled>- Año -</option>
                                                    <!-- Aquí se agrega DINÁMICAMENTE -->
                                                </select>
                                                <label>Seleccione el año:</label>
                                            </div>

                                            <div class="input-field select-container col s12 l6">
                                                <select id="${identificador}-select-mes" required>
                                                    <option disabled>- Mes -</option>
                                                    <!-- Aquí se agrega DINÁMICAMENTE -->
                                                </select>
                                                <label>Seleccione el mes:</label>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }

    static crearFormEditarItem(identificador) {
        return VistaForm.#crearFormItem(identificador);
    }

    static crearFormRegistrarse(identificador) {
        let $contenidoDelFormulario = document.createElement("div");
        $contenidoDelFormulario.classList.add('row');

        $contenidoDelFormulario.innerHTML = `<div class="error red-text center-align">
                                                <div id="error-${identificador}"></div>
                                            </div>
                                            <div class="row">
                                                <div class="input-field col s6">
                                                    <input id="${identificador}-usuario" type="text" required>
                                                    <label for="${identificador}-usuario">Usuario</label>
                                                </div>
                                            
                                                <div class="input-field col s6">
                                                    <input id="${identificador}-contrasena" type="password" minlength="5" required>
                                                    <label for="${identificador}-contrasena">Contraseña</label>
                                                </div>
                                            </div>`;
        
        return $contenidoDelFormulario;
    }
}

export { VistaForm };