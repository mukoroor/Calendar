import {CalendarEventStore} from "./CalendarEventStore.js";
import YearState from "./State/YearState.js";
import MonthState from "./State/MonthState.js";
import MonthView from "./View/MonthView.js";
import WeekState from "./State/WeekState.js";
import WeekView from "./View/WeekView.js";
import DayState from "./State/DayState.js";
import DayView from "./View/DayView.js";

export const calendarEventController = {
    selected: new Set(),

    toggleEvent(hash) {
        const lookupParams = hash.split('-');
        const event = CalendarEventStore.getEvent(...lookupParams);
        if (this.selected.has(event)) this.selected.delete(event);
        else this.selected.add(event);
    }
}

export const viewStateController = {
    state: new DayState(new Date()),
    view: new DayView(),
    
    updateState(id) {
        if (id === 0) {
            if (!(this.state instanceof YearState)) {
                this.state = new YearState(this.state.focusedDate);
                // this.view = new YearView();
            } 
        } else if (id === 1) {
            if (!(this.state instanceof MonthState)) {
                this.state = new MonthState(this.state.focusedDate);
                this.view = new MonthView();
            } 
        } else if (id === 2) {
            if (!(this.state instanceof WeekState)) {
                this.state = new WeekState(this.state.focusedDate);
                this.view = new WeekView();
            } 
        } else if (id === 3) {
            if (!(this.state instanceof DayState)) {
                this.state = new DayState(this.state.focusedDate);
                this.view = new DayView();
            } 
        } else {
            throw new Error("Invalid id");
        }
        this.updateData();
    },

    updateData() {
        const data = this.state.generateData();
        this.view.render(data);
    },

    next() {
        this.state.next();
        this.updateData();
    },

    previous() {
        this.state.previous();
        console.log(this.state.focusedDate);
        this.updateData();
    }
}
