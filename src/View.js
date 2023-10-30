export default class View {
    #component

    constructor() {}

    get component() {
        return this.#component;
    }

    set component(newComponent) {
        this.#component = newComponent;
    }
}