import { Excepcion } from '../../igzframework.js';

class SetearEnFormulario extends Excepcion {
    constructor(elemento = "", selector, valor) {
        super();
        this.elemento = elemento;
        this.selector = selector;
        this.valor = valor;
        
        this.nombre = "Setear a formulario";
        this.msj = new String();
        this.lanzarExcepcion();
    }

    toString() {
        this.agregarLineaInfo("Elemento", this.elemento.toUpperCase());
        this.agregarLineaInfo("Selector", this.selector);
        this.agregarLineaInfo("Valor", this.valor);

        return this.mostrarInfo();
    }
}

export { SetearEnFormulario as Excepcion_setearEnFormulario };