import DayViewStrategy from "../Strategy/DayViewStrategy.js";
import CalendarEventView from "./CalendarEventView.js";
import TimeRangeView from "./TimeRangeView.js";

const EMPTY_DAY = document.createElement('div');
EMPTY_DAY.textContent = 'NO EVENTS'
EMPTY_DAY.classList.add('empty');

export default class DayView extends TimeRangeView {
    static viewStrategy = new DayViewStrategy();

    constructor() {
        super();
    }

    renderChildren(data, start) {
        const childrenElements = [];

        if (data) {
            for (const entry of data.inOrder()) {
                const cv = new CalendarEventView();
                cv.render(entry, DayView.viewStrategy);
                childrenElements.push(cv.component);
            }
        } else {
            childrenElements.push(EMPTY_DAY);
        }

        return childrenElements;
    }
}