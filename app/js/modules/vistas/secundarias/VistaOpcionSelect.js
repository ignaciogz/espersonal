class VistaOpcionSelect {
    static crearOpcion(valor) {
        let $option = document.createElement("option");
        $option.setAttribute("value", valor);

        $option.text = valor;

        return $option;
    }
}

export { VistaOpcionSelect };