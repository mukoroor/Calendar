import TimeRangeState from "./TimeRangeState.js";
import { CalendarEventStore } from "../Model/CalendarEventStore.js";

export default class WeekState extends TimeRangeState {
    constructor() {
        super();
    }

    next(date) {
        const nextDate = new Date(date);
        const dist = 7 - nextDate.getDay();
        nextDate.setDate(nextDate.getDate() + dist);
        return nextDate;
    }

    previous(date) {
        const prevDate = new Date(date);
        const dist = -7 - prevDate.getDay();
        prevDate.setDate(prevDate.getDate() + dist);
        return prevDate;
    }

    generateData(date) {
        const week = [];

        const start  = [];
        
        const copy = new Date(date);
        copy.setDate(copy.getDate() - date.getDay());
        
        for (let i = 0; i < 7; i++) {
            const params = TimeRangeState.dateToYMD(copy);
            
            const events = CalendarEventStore.getDay(...params)?.queue;
            let timeline = [];

            if (events) {
                timeline = this.eventsToTimeline(events);
            }

            week.push(timeline);
            start.push(params);
            copy.setDate(copy.getDate() + 1);
        }

        return {data: week, start};
    }
}