export default class View {
    #component

    constructor() {
        this
    }

    render(data) {
    }

    get component() {
        return this.#component;
    }

    set component(newComponent) {
        this.#component = newComponent;
    }
}