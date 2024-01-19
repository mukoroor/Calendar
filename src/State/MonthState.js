import TimeRangeState from "./TimeRangeState.js";
import { CalendarEventStore } from "../Model/CalendarEventStore.js";

export default class MonthState extends TimeRangeState {
    constructor() {
        super();
    }

    next(date) {
        const nextDate = new Date(date);
        nextDate.setDate(1);
        nextDate.setMonth(nextDate.getMonth() + 1);
        return nextDate;
    }

    previous(date) {
        const prevDate = new Date(date);
        prevDate.setDate(1);
        prevDate.setMonth(prevDate.getMonth() - 1);
        return prevDate;
    }

    generateData(date) {
        const params = TimeRangeState.dateToYMD(date);
        return {data: CalendarEventStore.getMonth(...params), start: params};
    }
}