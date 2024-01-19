import { DaysShort } from "../Model/DateMappings.js";
import ViewStrategy from "./ViewStrategy.js";

export default class MonthViewStrategy extends ViewStrategy {
    constructor() {
        super();
    }

    renderEvent(data) {
        // const div = document.createElement('div');
        const span = document.createElement('span');
        span.style.setProperty('--col', data.color);
        span.classList.add('stg')
        // div.append(span);
        // div.addEventListener("click", this.select.bind(this));
        // span.textContent = data.name;
        return span;
    }

    renderTimeRangeMarker() {
        const timeMarker = document.createElement('div');

        timeMarker.classList.add('grid-days-bar');

        DaysShort.forEach(e => {
            const span = document.createElement('span');
            span.textContent = e;
            timeMarker.append(span);
        })

        return timeMarker;
    }

}