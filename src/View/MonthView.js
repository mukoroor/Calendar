import TimeRangeView from "./TimeRangeView.js";
import CalendarEventView from "./CalendarEventView.js";
import MonthViewStrategy from "../Strategy/MonthViewStrategy.js"
import { dayNavigatorController as DNC, stateController as SC} from "../Controller.js";
import { DaysShort } from "../Model/DateMappings.js";

export default class MonthView extends TimeRangeView {
    static viewStrategy = new MonthViewStrategy();

    constructor() {
        super();
    }
    
    render(data, start) {
        let out = [];
        this.component = document.createElement('main');
        const dayOfTheWeekTracker = new Date(start[0], start[1] - 1, 1);

        for (let i = 1; i <= data.length; i++) {
            const dayComponent = document.createElement('div');
            const section = document.createElement('section');
            const header = document.createElement('h4');
            
            dayComponent.addEventListener('click', () => {
                this.component.querySelector('.today').classList.remove('today')
                dayComponent.classList.add('today');
                this.changeDate(+start[0], +start[1] - 1, i);
            });

            if(i === +start[2]) dayComponent.classList.add('today');
            dayOfTheWeekTracker.setDate(i);
            header.textContent = `${i} ${DaysShort[dayOfTheWeekTracker.getDay()]}`;

            const cVStore = data[i - 1]?.inOrder().map((entry) => {
                const cv = new CalendarEventView(); //box?
                cv.render(entry, MonthView.viewStrategy);
                cv.component.classList.add('box');
                return cv.component;
            });

            if (cVStore) section.append(...cVStore);
            dayComponent.append(header, section);
            out.push(dayComponent);
        }

        this.component.classList.add('month');
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