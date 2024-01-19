import TimeRangeView from "./TimeRangeView.js";
import CalendarEventView from "./CalendarEventView.js";
import MonthViewStrategy from "../Strategy/MonthViewStrategy.js"
import { DaysShort } from "../Model/DateMappings.js";

export default class MonthView extends TimeRangeView {
    static viewStrategy = new MonthViewStrategy();

    constructor() {
        super();
    }
    
    renderChildren(data, start) {
        const childrenElements = [];
        const dayOfTheWeekTracker = new Date(start[0], start[1], 1);

        for (let i = 1; i <= data.length; i++) {
            const dayComponent = document.createElement('div');
            const section = document.createElement('section');
            const header = document.createElement('h4');
            
            dayComponent.addEventListener('click', e => this.onDayClicked(e.currentTarget, start[0], start[1], i));

            dayOfTheWeekTracker.setDate(i);
            header.textContent = `${i} ${DaysShort[dayOfTheWeekTracker.getDay()]}`;

            const cVStore = data[i - 1]?.inOrder().map((entry) => {
                const cv = new CalendarEventView();
                cv.render(entry, MonthView.viewStrategy);
                cv.component.classList.add('box');
                return cv.component;
            });

            
            if (cVStore) section.append(...cVStore);
            dayComponent.append(header, section);
            childrenElements.push(dayComponent);
        }
        
        childrenElements[start[2]].classList.add('today');
        
        return childrenElements;
    }
}