import CalendarEventView from "./CalendarEventView.js";
import StateView from "./StateView.js";

export default class YearView extends StateView {
    constructor() {
        super();
    }

    render(data, start) {
        if (!data) return;
        let out = [];
        this.component = document.createElement('main');
        this.component.textContent = start[0];
        for (const month of data) {
            for (const day of month) {
                if (!day) continue;
                for (const entry of day.heap) {
                    const cv = new CalendarEventView();
                    cv.render(entry);
                    out.push(cv.component);
                }
            }
        }
        this.component.replaceChildren(...out);
        document.querySelector('body').replaceChild(this.component, document.querySelector('body').lastElementChild);
    }
}