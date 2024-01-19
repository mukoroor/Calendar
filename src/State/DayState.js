import { CalendarEventStore } from "../Model/CalendarEventStore.js";
import TimeRangeState from "./TimeRangeState.js";

export default class DayState extends TimeRangeState {

    constructor() {
        super();
    }
    
    next(date) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate;
    }

    previous(date) {
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 1);
        return prevDate;
    }

    generateData(date) {
        const params = TimeRangeState.dateToYMD(date);
        return {data: CalendarEventStore.getDay(...params), start: params};
    }
}