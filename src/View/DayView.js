import DayViewStrategy from "../Strategy/DayViewStrategy.js";
import CalendarEventView from "./CalendarEventView.js";
import StateView from "./StateView.js";

export default class DayView extends StateView {
    static viewStrategy = new DayViewStrategy();

    constructor() {
        super();
    }

    render(data, start) {
        if (!data) return;
        let out = [];
        this.component = document.createElement('main');
        for (const entry of data.heap) {
            const cv = new CalendarEventView(DayView.viewStrategy);
            cv.render(entry);
            out.push(cv.component);
        }
        this.component.classList.add('day');
        this.component.replaceChildren(...out);
        super.render();
        document.querySelector('body').replaceChild(this.component, document.querySelector('body').lastElementChild);
    }
}