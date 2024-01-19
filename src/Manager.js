import WeekState from "./State/WeekState.js";
import YearView from "./View/YearView.js";
import MonthView from "./View/MonthView.js";
import WeekView from "./View/WeekView.js";
import DayView from "./View/DayView.js";
import { dayNavigatorController as DNC } from "./Controller.js";

const stateManager = {
    state: null,
    observers: new Map([['Year', new YearView()], ['Month', new MonthView()], ['Week', new WeekView()], ['Day', new DayView()]]),

    setState(newState) {
        this.state = newState;
        this.notify();
    },

    notify() {
        const vals = this.state.generateData(DNC.model.currentDay);
        this.observers.get(this.state.constructor.name.replace('State', '')).render(vals.data, vals.start);
    },

    init() {
        this.setState(new WeekState(new Date()));
    }
}

export default stateManager;