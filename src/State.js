export default class State {
    #focusedDate

    constructor(focusedDate) {
        this.#focusedDate = focusedDate;
    }

    next() {
        throw new Error("must implement");
    }

    previous() {
        throw new Error("must implement");
    }

    generateView() {
        throw new Error("must implement");
    }

    get focusedDate() {
        return this.#focusedDate;
    }
    
    set focusedDate(newDate) {
        this.#focusedDate = newDate;
    }
}