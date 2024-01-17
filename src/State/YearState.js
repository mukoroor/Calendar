import TimeRangeState from "./TimeRangeState.js";
import { CalendarEventStore } from "../Model/CalendarEventStore.js";

export default class YearState extends TimeRangeState {
    constructor() {
        super();
    }

    next(date) {
        const nextDate = new Date(date);
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        return nextDate;
    }

    previous(date) {
        const prevDate = new Date(date);
        prevDate.setFullYear(prevDate.getFullYear() - 1);
        return prevDate;
    }

    generateData(date) {
        const params = date.toLocaleDateString('zh-CN').split('/');
        return {data: CalendarEventStore.getYear(...params), start: params};
    }
}