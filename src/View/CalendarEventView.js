import View from "./View.js";
import {calendarEventController as CEC} from "../Controller.js";

export default class CalendarEventView extends View {
    #eventHash
    #renderingViewStrategy

    constructor(renderingViewStrategy) {
        super();
        this.#renderingViewStrategy = renderingViewStrategy;
    }

    select() {
        CEC.toggleEvent(this.#eventHash);
        this.component.classList.toggle('select');
        //custome event 
    }

    render(data) {
        this.component = this.#renderingViewStrategy.render(data);
        this.#eventHash = data.hash;
    }

    // singular
}