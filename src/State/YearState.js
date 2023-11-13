import State from "./State.js";
import { CalendarEventStore } from "../CalendarEventStore.js";

export default class YearState extends State {
    constructor(focusedDate) {
        super(focusedDate);
    }

    next() {
        const past = this.focusedDate;
        past.setFullYear(past.getFullYear() + 1);
    }

    previous() {
        const past = this.focusedDate;
        past.setFullYear(past.getFullYear() - 1);
    }

    generateData() {
        const params = this.focusedDate.toLocaleDateString('zh-CN').split('/');
        return {data: CalendarEventStore.getYear(...params), start: params};
    }
}