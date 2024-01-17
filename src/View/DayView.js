import { dayNavigatorController as DNC, stateController as SC} from "../Controller.js";
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

    render(data, start) {
        let out = [];
        this.component = document.createElement('main');

        if (data) {
            for (const entry of data.inOrder()) {
                const cv = new CalendarEventView();
                cv.render(entry, DayView.viewStrategy);
                out.push(cv.component);
            }
        } else {
            out.push(EMPTY_DAY);
        }

        this.component.classList.add('day');
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