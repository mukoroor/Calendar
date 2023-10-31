import State from "./State.js";
import { CalendarEventStore } from "./CalendarEventStore.js";

export default class MonthState extends State {
    constructor(focusedDate) {
        super(focusedDate);
    }

    next() {
        const past = this.focusedDate;
        past.setDate(1);
        past.setMonth(past.getMonth() + 1);
    }

    previous() {
        const past = this.focusedDate;
        past.setDate(1);
        past.setMonth(past.getMonth() - 1);
    }

    generateData() {
        const params = this.focusedDate.toLocaleDateString('zh-CN').split('/');
        return CalendarEventStore.getMonth(...params);
    }
}