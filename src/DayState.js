import { CalendarEventStore } from "./CalendarEventStore.js";
import CalendarEventView from "./CalendarEventView.js";
import State from "./State.js";

export default class DayState extends State {

    constructor(focusedDate) {
        super(focusedDate);
    }
    
    next() {
        const prev = this.focusedDate;
        this.focusedDate = prev.setDate(prev.getDate() + 1);
    }

    previous() {
        const prev = this.focusedDate;
        this.focusedDate = prev.setDate(prev.getDate() + 1);
    }

    generateView() {
        const params = this.focusedDate.toLocaleDateString('zh-CN').split('/');
        params[1]--;
        const map = CalendarEventStore.getDay(...params);
        for (const e of map.heap) {
            const v = new CalendarEventView(e);
            document.querySelector('body').append(v.component);
        }
    }
}