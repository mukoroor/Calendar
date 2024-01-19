import settings from "../Settings.js";
import TimeRangeView from "./TimeRangeView.js";
import { DaysMed } from "../Model/DateMappings.js";
import CalendarEventView from "./CalendarEventView.js";
import WeekViewStrategy from "../Strategy/WeekViewStrategy.js";
import { dayNavigatorController as DNC } from "../Controller.js";

export default class WeekView extends TimeRangeView {
    static viewStrategy = new WeekViewStrategy();

    constructor() {
        super();
    }

    renderChildren(data, start) {
        const childrenElements = [];
        const isOverlap = settings.mode == 'overlap';

        let todayIndex = DNC.model.currentDay.getDay();

        if (!isOverlap) {
            childrenElements.push(WeekView.viewStrategy.renderTimeRangeMarker());
            todayIndex++;
        }

        for (let i = 0; i < data.length; i++) {
            const dayComponent = document.createElement('div');
            const section = document.createElement('section');
            const header = document.createElement('h4');

            section.classList.add(isOverlap ? 'grid-seq' : 'grid-time');
            
            dayComponent.addEventListener('click', e => this.onDayClicked(e.currentTarget, start[i][0], start[i][1], start[i][2]));
            dayComponent.style.gridColumn = i + 2;

            const dayofWeek = document.createElement('span');
            const dayNo = document.createElement('span');

            dayofWeek.textContent = DaysMed[i];
            dayNo.textContent = start[i][2];
            header.append(dayofWeek, dayNo);

            const cVStore = [];

            for(const entry of data[i]) {
                const cv = new CalendarEventView();
                cv.render(entry, WeekView.viewStrategy);
                cVStore.push(cv.component);

                if(!isOverlap) {
                    const startRow = entry.startTime.getHours() * 60 + entry.startTime.getMinutes();
                    const endRow = entry.endTime.getHours() * 60 + entry.endTime.getMinutes();

                    cv.component.style.gridColumnStart = entry.col;
                    cv.component.style.gridRowStart = startRow;
                    cv.component.style.gridRowEnd = endRow;
                    delete entry.col;
                }
            }

            section.append(...cVStore);
            dayComponent.append(header, section);
            childrenElements.push(dayComponent);
        }

        childrenElements[todayIndex].classList.add('today');

        return childrenElements;
    }
}