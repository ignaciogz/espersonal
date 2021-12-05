import { Excepcion } from '../../igzframework.js';

class SetearEnFormulario extends Excepcion {
    constructor(elemento = "", selector, valor, ...restantes) {
        super("Setear a formulario", ...restantes);
        this.elemento = elemento;
        this.selector = selector;
        this.valor = valor;
        
        this.setInfoDepuracion();
        this.lanzarExcepcion();
    }

    setInfoDepuracion() {
        this.setLineaInfo("Elemento", this.elemento.toUpperCase());
        this.setLineaInfo("Selector", this.selector);
        this.setLineaInfo("Valor", this.valor);
    }
}

export { SetearEnFormulario as Excepcion_setearEnFormulario };