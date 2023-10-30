import CalendarEventStore from "./CalendarEventStore";

export default class CalendarEvent {
    #id
    #date
    #time
    #name

    constructor({date, time, name}) {
        this.#id = CalendarEventStore.addEvent(this);
        this.#date = date;
        this.#time = time;
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

}