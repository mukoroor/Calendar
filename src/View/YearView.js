import YearViewStrategy from "../Strategy/YearViewStrategy.js";
import CalendarEventView from "./CalendarEventView.js";
import TimeRangeView from "./TimeRangeView.js";
import { MonthNames } from "../Model/DateMappings.js";
import { dayNavigatorController as DNC} from "../Controller.js";


export default class YearView extends TimeRangeView {
    static viewStrategy = new YearViewStrategy();

    constructor() {
        super();
    }

    renderChildren(data, start) {
        const childrenElements = [];

        for (let k = 0; k < data.length; k++) {
            const month = document.createElement('div');
            const h5 = document.createElement('h4');
            
            const dayGroup = document.createElement('section');
            const days = [];
            
            h5.textContent = MonthNames[k];

            for (let i = 0; i < data[k].length; i++) {
                const daySingular = document.createElement('div');
                const section = document.createElement('section');
                const h6 = document.createElement('h5');

                const dayNo = i + 1;
                h6.textContent = dayNo;

                daySingular.addEventListener('click', e => {
                    this.component.querySelector('.parent-today').classList.remove('parent-today');
                    month.classList.add('parent-today');
                    this.onDayClicked(e.currentTarget, start[0], k, dayNo);
                });

                const events = [];
                if (data[k][i]) {
                    for (const entry of data[k][i].inOrder()) {
                        const cv = new CalendarEventView();
                        cv.render(entry, YearView.viewStrategy);
                        cv.component.classList.add('circle');
                        events.push(cv.component);
                    }
                }

                section.append(...events);
                daySingular.append(h6, section);
                days.push(daySingular);
            }

            dayGroup.append(...days);
            month.append(h5, dayGroup);
            childrenElements.push(month);
        }

        childrenElements[DNC.model.currentDay.getMonth()].classList.add('parent-today');
        childrenElements[DNC.model.currentDay.getMonth()].lastChild.children[DNC.model.currentDay.getDate() - 1].classList.add('today');

        return childrenElements;
    }
}