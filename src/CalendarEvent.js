import {CalendarEventStore} from "./CalendarEventStore.js";

export default class CalendarEvent {
    #id
    #date
    #time
    #name
    #color

    constructor({date, time, name, color}) {
        this.#date = date;
        this.#time = time;
        this.#name = name;
        this.#color = color;
        this.#id = CalendarEventStore.addEvent(this);
    }

    get date() {
        return this.#date;
    }

    get time() {
        return this.#time;
    }

    get hash() {
        return this.#date + '-' + this.#id;
    }

    get name() {
        return this.#name;
    }

    get color() {
        return this.#color;
    }

    static compare(a, b) {
        return a.name < b.name;
    }
}