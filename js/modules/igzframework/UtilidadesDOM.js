class UtilidadesDOM {
    static agregar(contenedor, elemento) {
        contenedor.appendChild(elemento);
    }

    static crearFragmento() {
        return document.createDocumentFragment();
    }

    static limpiarTexto(contenedor) {
        contenedor.textContent = "";
    }

    static existeEnDOM(nodo) {
        return (nodo === document.body) ? false : document.body.contains(nodo);
    }

    static modificarTexto(selector, texto) {
        const $elemento = document.querySelector(selector);

        if (UtilidadesDOM.existeEnDOM($elemento)) {
            $elemento.textContent = texto;
        }
    }

    static mostrarError(contenedor, msj) {
        contenedor.textContent = "ERROR -> " + msj;
        setTimeout(function () { UtilidadesDOM.limpiarTexto(contenedor); }, 8000);
    }

    static display(contenedor, valor = 'block') {
        contenedor.style.display = valor;
    }
}

export { UtilidadesDOM };