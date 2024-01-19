import View from "./View.js";
import { dayNavigatorController as DNC, stateController as SC} from "../Controller.js";
import stateManager from "../Manager.js";

export default class TimeRangeView extends View {
    static viewStrategy;

    constructor() {
        super();
    }

    render(data, start) {
        this.component = document.createElement('main');
        const childrenElements = this.renderChildren(data, start);
        this.cleanup(childrenElements);
        this.show();
    }

    renderChildren(data, start) {
        throw new Error('must implement');
    } 

    cleanup(childrenElements) {
        const classShort = this.constructor.name.replace('View', '').toLowerCase();
        this.component.classList.add('view', classShort);

        const controlPanel = document.createElement('header');
        controlPanel.append(DNC.view.component,  SC.view.component);
        DNC.updateView();
        
        const renderData = document.createElement('section');
        renderData.append(...childrenElements);
        
        this.component.append(controlPanel, renderData);
    }

    onDayClicked(clickedDayElement, year, month, date) {
        this.component.querySelector('.today').classList.remove('today')
        clickedDayElement.classList.add('today');
        TimeRangeView.changeDate(year, month, date);
    }

    show() {
        document.querySelector('.view')?.replaceWith(this.component);
    }

    static changeDate(year, month, date) {
        const dateObj = new Date(year, month, date);
        DNC.model.setCurrentDay(dateObj);
        stateManager.notify();
    }
}