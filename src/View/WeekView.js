import View from "./View.js";
import CalendarEventView from "./CalendarEventView.js";

export default class WeekView extends View {
    constructor() {
        super();
    }

    render(data) {
        let out = [];
        this.component = document.createElement('main');
        for (const day of data) {
            for (const entry of day.heap) {
                const cv = new CalendarEventView();
                cv.render(entry);
                out.push(cv.component);
            }
        }
        this.component.replaceChildren(...out);
        document.querySelector('body').replaceChild(this.component, document.querySelector('body').lastElementChild);
    }
}