import stateManager from "../Manager.js";
import { dayNavigatorController as DNC } from "../Controller.js";

const DayNavigator = {
    currentDay: new Date(),

    next() {
        this.currentDay = stateManager.state.next(this.currentDay);
    },

    previous() {
        this.currentDay = stateManager.state.previous(this.currentDay);
    },

    setCurrentDay(date) {
        this.currentDay = date;
        DNC.updateView();
    }
}

export default DayNavigator;