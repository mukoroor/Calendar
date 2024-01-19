import ViewStrategy from "./ViewStrategy.js";
import TimeRangeState from "../State/TimeRangeState.js";

export default class WeekViewStrategy extends ViewStrategy {
    constructor() {
        super();
    }

    renderEvent(data) {
        const div = document.createElement('div');
        div.style.setProperty('--col', data.color);
        const span = document.createElement('span');
        div.append(span);
        div.classList.add('stg')
        // div.addEventListener("click", this.select.bind(this));
        span.textContent = data.name;
        return div;
    }

    renderTimeMarker() {
        const timeMarker = document.createElement('div');
        const timeMarkerHeader = document.createElement('h4');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');

        span1.textContent = 'Time';
        span2.textContent = TimeRangeState.getTimeZoneName('short');
        timeMarkerHeader.append(span1, span2);
        timeMarker.append(timeMarkerHeader);
        timeMarker.classList.add('grid-time-bar');

        for (let i = 0; i < 24; i++) {
            const hour = document.createElement('span');
            hour.textContent = `${i < 10 ? '0' + i: i}:00`;
            timeMarker.append(hour);
        }
        return timeMarker;
    }

}