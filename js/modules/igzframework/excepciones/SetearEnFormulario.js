import { Excepcion } from '../../igzframework.js';

class SetearEnFormulario extends Excepcion {
    constructor(elemento = "", selector, valor) {
        super();
        this.elemento = elemento;
        this.selector = selector;
        this.valor = valor;
        
        this.nombre = "Setear a formulario";
        this.lanzarExcepcion();
    }

    toString() {
        return `\n:: Excepción - ${this.nombre}: \n\n-> Elemento: ${this.elemento.toUpperCase()}\n-> Selector: "${this.selector}"\n-> Valor: "${this.valor}"`;
    }
}

export { SetearEnFormulario as Excepcion_setearEnFormulario };