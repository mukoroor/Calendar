import State from "./State.js";
import { CalendarEventStore } from "../CalendarEventStore.js";

export default class WeekState extends State {
    constructor(focusedDate) {
        super(focusedDate);
    }

    next() {
        const past = this.focusedDate;
        const dist = 7 - past.getDay();
        past.setDate(past.getDate() + dist);
    }

    previous() {
        const past = this.focusedDate;
        const dist = -7 - past.getDay();
        past.setDate(past.getDate() + dist);
    }

    generateData() {
        const week = [];
        let copy = new Date(this.focusedDate);
        copy.setDate(copy.getDate() - this.focusedDate.getDay());
        const start  = [];
        for (let i = 0; i < 7; i++) {
            const params = copy.toLocaleDateString('zh-CN').split('/');
            week.push(CalendarEventStore.getDay(...params));
            start.push(params);
            copy.setDate(copy.getDate() + 1);
        }
        return {data: week, start};
    }
}