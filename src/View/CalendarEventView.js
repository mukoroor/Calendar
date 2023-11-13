import View from "./View.js";
import {calendarEventController as CEC} from "../Controller.js";

export default class CalendarEventView extends View {
    #eventHash

    constructor() {
        super();
    }

    select() {
        CEC.toggleEvent(this.#eventHash);
        this.component.classList.toggle('select');
        //custome event 
    }

    render(data, viewRenderingStrategy) {
        this.component = viewRenderingStrategy.render(data);
        this.#eventHash = data.hash;
    }

    // singular
}