import View from "./View.js";
import {calendarEventController as CEC} from "./Controller.js";
im

export default class CalendarEventView extends View {
    #eventHash

    constructor(event) {
        super();
        const div = document.createElement('div');
        const span = document.createElement('span');
        div.append(span);
        span.textContent = event.name;
        this.component = div;

    }

    onClick() {
        CEC.toggleEvent(this.#eventHash);
    }


}