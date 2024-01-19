import CalendarEvent from "./CalendarEvent.js";
import PriorityQueue from "./PriorityQueue.js";

// Maps => Year => Array of Month which stores Array of Days which stores Array of Events
const eventDateMap = new Map();

const monthLengths = Array.from({length: 12}, (_, i) => new Date(0, i + 1, 0).getDate());
const EMPTY_YEAR = Array.from({length: 12}, (e, i) => {
    return Array(monthLengths[i]);
})

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

class dayHeapMap extends Map {
    #id = 0;
    #queue = new PriorityQueue(CalendarEvent.compare);

    constructor() {
        super();
    }

    add(id, event) {
        super.set(id, event);
        this.#queue.enqueue(event);
    }

    get queue() {
        return this.#queue;
    }

    inOrder() {
        return this.#queue.inOrder();
    }

    get id() {
        return this.#id++;
    }
}

export const CalendarEventStore = {
    getYear(yearNo) {
        if (isLeapYear(yearNo)) monthLengths[1] = 29;
        else monthLengths[1] = 28;
        if (!eventDateMap.has(yearNo)) {
            EMPTY_YEAR[1] = Array(monthLengths[1]);
            return EMPTY_YEAR;
        }
        return eventDateMap.get(yearNo);
    },

    addYear(yearNo) {
        const monthStore = Array(12);
        if (isLeapYear(yearNo)) monthLengths[1] = 29;
        else monthLengths[1] = 28;
        for (let i = 0; i < monthStore.length; i++) {
            monthStore[i] = Array(new Date(yearNo, i + 1, 0).getDate());
        }
        eventDateMap.set(yearNo, monthStore);
    },

    getMonth(yearNo, monthNo) {
        const year = CalendarEventStore.getYear(yearNo);
        return year[monthNo];
    },

    getDay(yearNo, monthNo, dayNo) {
        const month = CalendarEventStore.getMonth(yearNo, monthNo);
        return month[dayNo - 1];
    },

    getEvent(yearNo, monthNo, dayNo, id) {
        const day = CalendarEventStore.getDay(yearNo, monthNo, dayNo);
        if (!day || !day.has(id)) return null;
        return day.get(id);
    },

    addEvent(e) {
        const [year, month, day] = [e.startTime.getFullYear(), e.startTime.getMonth(), e.startTime.getDate()];
        if (!eventDateMap.has(year)) CalendarEventStore.addYear(year);

        const monthStore = eventDateMap.get(year)[month];
        if (!monthStore[day - 1]) monthStore[day - 1] = new dayHeapMap();

        const dayStore = monthStore[day - 1];
        const id = dayStore.id;
        dayStore.add(id, e);
        return id;
    }
};
console.log(eventDateMap);