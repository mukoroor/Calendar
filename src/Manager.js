import DayState from "./State/DayState.js";
import YearView from "./View/YearView.js";
import MonthView from "./View/MonthView.js";
import WeekView from "./View/WeekView.js";
import DayView from "./View/DayView.js";

const stateManager = {
    state: new DayState(new Date()),
    observers: new Map([['Year', new YearView()], ['Month', new MonthView()], ['Week', new WeekView()], ['Day', new DayView()]]),

    setState(newState) {
        this.state = newState;
        this.notify();
    },

    notify() {
        const vals = this.state.generateData();
        this.observers.get(this.state.constructor.name.replace('State', '')).render(vals.data, vals.start);
    }
}

export default stateManager;