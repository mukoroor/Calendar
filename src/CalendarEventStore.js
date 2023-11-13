// Maps => Year => Array of Month which stores Array of Days which stores Array of Events
const eventDateMap = new Map();


class dayHeapSet extends Map {
    #id = 0;
    heap = []
    constructor() {
        super();
    }

    add(id, event) {
        super.set(id, event);
        this.heap.push(event);
    }

    get id() {
        return this.#id++;
    }
}

export const CalendarEventStore = {
    getYear(yearNo) {
        if (!eventDateMap.has(yearNo)) CalendarEventStore.addYear(yearNo);
        return eventDateMap.get(yearNo);
    },

    addYear(yearNo) {
        const monthStore = Array(12);
        for (let i = 1; i < 13; i++) {
            monthStore[i - 1] = Array(new Date(yearNo, i, 0).getDate());
        }
        eventDateMap.set(yearNo, monthStore);
    },
    getMonth(yearNo, monthNo) {
        const year = CalendarEventStore.getYear(yearNo);
        if (!year || !year[+monthNo - 1]) return null;
        return year[+monthNo - 1];
    },
    getDay(yearNo, monthNo, dayNo) {
        const month = CalendarEventStore.getMonth(yearNo, monthNo);
        if (!month || !month[+dayNo - 1]) return null;
        return month[+dayNo - 1];
    },
    getEvent(yearNo, monthNo, dayNo, id) {
        const day = CalendarEventStore.getDay(yearNo, monthNo, dayNo);
        if (!day || !day.has(+id)) return null;
        return day.get(+id);
    },
    addEvent(e) {
        const [year, month, day] = e.date.split('-');
        if (!eventDateMap.has(year)) CalendarEventStore.addYear(year);

        const monthStore = eventDateMap.get(year)[+month - 1];
        if (!monthStore[+day - 1]) monthStore[+day - 1] = new dayHeapSet();

        const dayStore = monthStore[+day - 1];
        const id = dayStore.id;
        dayStore.add(id, e);
        return id
    }
};
console.log(eventDateMap);