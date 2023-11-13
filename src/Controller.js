import {CalendarEventStore} from "./CalendarEventStore.js";
import View from "./View/View.js";
import YearState from "./State/YearState.js";
import MonthState from "./State/MonthState.js";
import WeekState from "./State/WeekState.js";
import DayState from "./State/DayState.js";
import stateManager from "./Manager.js";

export const calendarEventController = {
    selected: new Set(),

    toggleEvent(hash) {
        const lookupParams = hash.split('-');
        const event = CalendarEventStore.getEvent(...lookupParams);
        if (this.selected.has(event)) this.selected.delete(event);
        else this.selected.add(event);
    }
}

export const stateIteratorController = {
    manager: stateManager,
    view: new View(),

    next() {
        this.manager.state.next();
        this.manager.notify();
    },

    previous() {
        this.manager.state.previous();
        this.manager.notify();
    }
}

stateIteratorController.view.component = document.createElement('div');
let options = ['previous', 'next'].map((e, i) => {
    const button = document.createElement('button');
    button.textContent = e;
    button.onclick = () => {
        if (e === 'next') stateIteratorController.next();
        else stateIteratorController.previous();
    }
    return button;
})
stateIteratorController.view.component.replaceChildren(...options);


export const stateController = {
    manager: stateManager,
    view: new View(),

    updateState(id) {
        if (id === 0) {
            if (!(this.manager instanceof YearState)) {
                const newState = new YearState(this.manager.state.focusedDate);
                this.manager.setState(newState);
            } 
        } else if (id === 1) {
            if (!(this.manager instanceof MonthState)) {
                const newState = new MonthState(this.manager.state.focusedDate);
                this.manager.setState(newState);
            } 
        } else if (id === 2) {
            if (!(this.manager instanceof WeekState)) {
                const newState = new WeekState(this.manager.state.focusedDate);
                this.manager.setState(newState);
            } 
        } else if (id === 3) {
            if (!(this.manager instanceof DayState)) {
                const newState = new DayState(this.manager.state.focusedDate);
                this.manager.setState(newState);
            } 
        } else {
            throw new Error("Invalid id");
        }
    }
}

stateController.view.component = document.createElement('div');
options = Array.from(stateController.manager.observers).map((e, i) => {
    const button = document.createElement('button');
    button.textContent = e[1].constructor.name.replace('View','');
    button.onclick = () => stateController.updateState(i);
    return button;
})
stateController.view.component.replaceChildren(...options);
