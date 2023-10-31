import View from "./View.js";
import {calendarEventController as CEC} from "./Controller.js";

export default class CalendarEventView extends View {
    #eventHash

    constructor() {
        super();
    }

    select() {
        CEC.toggleEvent(this.#eventHash);
        this.component.classList.toggle('select');
    }

    render(data) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        div.append(span);
        div.addEventListener("click", this.select.bind(this));
        span.textContent = data.name;
        this.#eventHash = data.hash;
        this.component = div;
    }

    // singular
}