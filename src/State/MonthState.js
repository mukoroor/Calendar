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
        const month = [];

        const start  = [];
        
        const copy = new Date(date);
        copy.setDate(1);
        copy.setDate(copy.getDate() - copy.getDay());
        
        while(copy.getMonth() == date.getMonth() || copy < date) {
            for (let i = 0; i < 7; i++) {
                const params = TimeRangeState.dateToYMD(copy);
                
                const events = CalendarEventStore.getDay(...params)?.queue;
                let timeline = events ? this.eventsToTimeline(events) : [];
    
                month.push(timeline);
                start.push(params);
                copy.setDate(copy.getDate() + 1);
            }
        }    

        return {data: month, start};
        // const params = TimeRangeState.dateToYMD(date);
        // return {data: CalendarEventStore.getMonth(...params), start: params};
    }
}