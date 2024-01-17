import YearViewStrategy from "../Strategy/YearViewStrategy.js";
import CalendarEventView from "./CalendarEventView.js";
import TimeRangeView from "./TimeRangeView.js";
import { MonthNames } from "../Model/DateMappings.js";
import { dayNavigatorController as DNC, stateController as SC} from "../Controller.js";


export default class YearView extends TimeRangeView {
    static viewStrategy = new YearViewStrategy();

    constructor() {
        super();
    }

    render(data, start) {
        let out = [];
        this.component = document.createElement('main');

        for (let k = 0; k < data.length; k++) {
            let days = [];
            const month = document.createElement('div');
            const h5 = document.createElement('h4');
            h5.textContent = MonthNames[k];
            const dayGroup = document.createElement('section');

            if (k === DNC.model.currentDay.getMonth()) {
                month.classList.add('parent-today');
            }

            for (let i = 0; i < data[k].length; i++) {
                const group = document.createElement('div');
                const h6 = document.createElement('h5');
                const day = i + 1;
                h6.textContent = day;
                const section = document.createElement('section');

                if (k === DNC.model.currentDay.getMonth() && day === DNC.model.currentDay.getDate()) {
                    group.classList.add('today');
                }

                group.addEventListener('click', () => {
                    this.component.querySelector('.parent-today').classList.remove('parent-today');
                    this.component.querySelector('.today').classList.remove('today');
                    month.classList.add('parent-today');
                    group.classList.add('today');
                    this.changeDate(+start[0], k, day);
                });

                let events = [];
                if (data[k][i]) {
                    for (const entry of data[k][i].inOrder()) {
                        const cv = new CalendarEventView();
                        cv.render(entry, YearView.viewStrategy);
                        cv.component.classList.add('circle');
                        events.push(cv.component);
                    }
                }
                section.append(...events);
                group.append(h6, section);
                days.push(group);
            }
            dayGroup.append(...days);
            month.append(h5, dayGroup);
            out.push(month);
        }

        this.component.classList.add('year');
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