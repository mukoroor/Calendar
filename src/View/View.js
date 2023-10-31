export default class View {
    #component

    constructor() {
    }

    render(data) {
    }

    get component() {
        return this.#component;
    }

    set component(newComponent) {
        this.#component = newComponent;
        this.component.classList.add('view');
    }
}