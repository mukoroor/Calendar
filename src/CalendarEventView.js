import View from "./View.js";
import {calendarEventController as CEC} from "./Controller.js";

export default class CalendarEventView extends View {
    #eventHash

    constructor(event) {
        super();
        const div = document.createElement('div');
        const span = document.createElement('span');
        div.append(span);
        div.addEventListener("click", this.select.bind(this));
        // div.addEventListener("dbclick", );
        span.textContent = event.name;
        this.component = div;
        this.#eventHash = event.hash;

    }

    select() {
        CEC.toggleEvent(this.#eventHash);
        this.component.classList.toggle('select');
    }

    // singular
}