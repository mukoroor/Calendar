import {CalendarEventStore} from "./CalendarEventStore.js";

export default class CalendarEvent {
    #id
    #date
    #startTime
    #endTime
    #name
    #color

    constructor({ startTime, endTime, name, color}) {
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#name = name;
        this.#color = color;
        this.#id = CalendarEventStore.addEvent(this);
    }

    get startTime() {
        return this.#startTime;
    }

    get endTime() {
        return this.#endTime;
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
        return (
            a.startTime - b.startTime ||
            a.endTime - b.endTime ||
            a.name.localeCompare(b.name)
        );
    }
}