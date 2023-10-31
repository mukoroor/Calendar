import { CalendarEventStore } from "../CalendarEventStore.js";
import State from "./State.js";

export default class DayState extends State {

    constructor(focusedDate) {
        super(focusedDate);
    }
    
    next() {
        const past = this.focusedDate;
        past.setDate(past.getDate() + 1);
    }

    previous() {
        const past = this.focusedDate;
        past.setDate(past.getDate() + 1);
    }

    generateData() {
        const params = this.focusedDate.toLocaleDateString('zh-CN').split('/');
        return CalendarEventStore.getDay(...params);
    }
}