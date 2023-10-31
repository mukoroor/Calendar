import {CalendarEventStore} from "./CalendarEventStore.js";

export default class CalendarEvent {
    #id
    #date
    #time
    #name

    constructor({date, time, name}) {
        this.#date = date;
        this.#time = time;
        this.#name = name;
        this.#id = CalendarEventStore.addEvent(this);
    }

    get date() {
        return this.#date;
    }

    get hash() {
        return this.#date + '.' + this.#id;
    }

    get name() {
        return this.#name;
    }

}