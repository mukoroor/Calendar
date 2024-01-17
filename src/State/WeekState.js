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

    generateData(date, mode = 'non') {
        const week = [];
        let copy = new Date(date);
        copy.setDate(copy.getDate() - date.getDay());
        const start  = [];
        start.todayIndex = date.getDay();
        for (let i = 0; i < 7; i++) {
            const params = copy.toLocaleDateString('zh-CN').split('/');
            
            const events = CalendarEventStore.getDay(...params)?.queue;
            let timeline = [];

            if (events) {
                events.mode = mode;
                timeline = this.eventsToTimeline(events, mode);
            }

            week.push(timeline);
            start.push(params);
            copy.setDate(copy.getDate() + 1);
        }
        return {data: week, start};
    }
}