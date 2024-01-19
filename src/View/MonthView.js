import TimeRangeView from "./TimeRangeView.js";
import CalendarEventView from "./CalendarEventView.js";
import MonthViewStrategy from "../Strategy/MonthViewStrategy.js"
import { DaysShort, MonthLengths } from "../Model/DateMappings.js";
import { dayNavigatorController as DNC } from "../Controller.js";

export default class MonthView extends TimeRangeView {
    static viewStrategy = new MonthViewStrategy();

    constructor() {
        super();
    }
    
    renderChildren(data, start) {
        const childrenElements = [];
        let weekNo = 0;
        let className = 'before';

        childrenElements.push(MonthView.viewStrategy.renderTimeRangeMarker());

        for (let i = 0; i < data.length; i++) {
            const dayIndex = i % 7;
            if (dayIndex == 0) weekNo++;
            if (weekNo > 4 && start[i][2] < 7) className = 'after';
            else if (weekNo == 1 && start[i][2] < 22) className = undefined;
            
            const dayComponent = document.createElement('div');
            const section = document.createElement('section');
            const header = document.createElement('h4');
            
            dayComponent.addEventListener('click', e => this.onDayClicked(e.currentTarget, start[i][0], start[i][1], start[i][2]));
            
            if (className) dayComponent.classList.add(className);
            dayComponent.style.gridRow = weekNo + 1;
            dayComponent.style.gridColumn = dayIndex + 1;
            
            header.textContent = start[i][2];
            
            const cVStore = data[i].map((entry) => {
                const cv = new CalendarEventView();
                cv.render(entry, MonthView.viewStrategy);
                cv.component.classList.add('box');
                return cv.component;
            });

            
            if (cVStore) section.append(...cVStore);
            dayComponent.append(header, section);
            childrenElements.push(dayComponent);
        }

        const todayIndex = DNC.model.currentDay.getDate() + (start[0][2] == 1 ? -1: MonthLengths[start[0][1]] - start[0][2]);
        childrenElements[todayIndex + 1].classList.add('today');
        
        return childrenElements;
    }
}