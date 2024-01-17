import TimeRangeView from "./TimeRangeView.js";
import { DaysMed } from "../Model/DateMappings.js";
import CalendarEventView from "./CalendarEventView.js";
import WeekViewStrategy from "../Strategy/WeekViewStrategy.js";
import { dayNavigatorController as DNC, stateController as SC} from "../Controller.js";
import TimeRangeState from "../State/TimeRangeState.js";

export default class WeekView extends TimeRangeView {
    static viewStrategy = new WeekViewStrategy();

    constructor() {
        super();
    }

    render(data, start) {
        const out = [];
        this.component = document.createElement('main');
        const isOverlap = data.mode == 'overlap';
        delete data.mode;

        if (!isOverlap) {
            const timeContainer = document.createElement('div');
            const timeContainerHeader = document.createElement('h4');
            const span1 = document.createElement('span');
            const span2 = document.createElement('span');
    
            span1.textContent = 'Time';
            span2.textContent = TimeRangeState.getTimeZoneName('short');
            timeContainerHeader.append(span1, span2);
            timeContainer.append(timeContainerHeader);
            timeContainer.classList.add('grid-time-bar');

            for (let i = 0; i < 24; i++) {
                const hour = document.createElement('span');
                hour.textContent = `${i < 10 ? '0' + i: i}:00`;
                timeContainer.append(hour);
            }
            out.push(timeContainer);
        }


        for (let i = 0; i < data.length; i++) {
            const dayComponent = document.createElement('div');
            const section = document.createElement('section');
            const header = document.createElement('h4');

            if (i === start.todayIndex) {
                dayComponent.classList.add('today');
            }
            section.classList.add(isOverlap ? 'grid-seq' : 'grid-time');

            dayComponent.addEventListener('click', () => {
                this.component.querySelector('.today').classList.remove('today')
                dayComponent.classList.add('today');
                this.changeDate(+start[i][0], +start[i][1] - 1, +start[i][2]);
            });

            const dayofWeek = document.createElement('span');
            const dayNo = document.createElement('span');

            dayofWeek.textContent = DaysMed[i];
            dayNo.textContent =  start[i][2];
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
            out.push(dayComponent);
        }

        this.component.classList.add('week');
        DNC.updateView();
        const controlPanel = document.createElement('header');
        controlPanel.append(DNC.view.component,  SC.view.component);
        
        const renderData = document.createElement('section');
        renderData.append(...out);
        
        super.render();

        this.component.append(controlPanel, renderData);
        document.querySelector('.view')?.replaceWith(this.component);
    }
}