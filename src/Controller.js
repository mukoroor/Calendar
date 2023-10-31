import {CalendarEventStore} from "./CalendarEventStore.js";
import YearState from "./YearState.js";
import MonthState from "./MonthState.js";
import DayState from "./DayState.js";

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
    
    updateState(id) {
        if (id === 0) {
            if (this.state instanceof YearState) this.state = new YearState(this.state.focusedDate);
        } else if (id === 1) {
            if (this.state instanceof MonthState) this.state = new MonthState(this.state.focusedDate);
        } else if (id === 2) {
            if (this.state instanceof DayState) this.state = new DayState(this.state.focusedDate);
        } else {
            throw new Error("Invalid id");
        }
    }
}
