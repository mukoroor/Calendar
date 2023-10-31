// Maps => Year => Array of Month which stores Array of Days which stores Array of Events
const eventDateMap = new Map();


class dayMap extends Map {
    #id = 0;

    constructor() {
        super();
    }

    get id() {
        return this.#id++;
    }
}

export const CalendarEventStore = {
    getYear(yearNo) {
        if (!eventDateMap.has(yearNo)) throw new Error("No events");
        return eventDateMap.get(yearNo);
    },

    addYear(yearNo) {
        const monthStore = Array(12);
        for (let i = 0; i < 12; i++) {
            monthStore[i] = Array(new Date(yearNo, i + 1, 0).getDate());
        }
        eventDateMap.set(yearNo, monthStore);
    },
    getMonth(yearNo, monthNo) {
        const year = CalendarEventStore.getYear(yearNo);
        if (!year[+monthNo]) throw new Error("No events");
        return year[+monthNo];
    },
    getDay(yearNo, monthNo, dayNo) {
        const month = CalendarEventStore.getMonth(yearNo, monthNo);
        if (!month[+dayNo]) throw new Error("No events");
        return month[+dayNo];
    },
    getEvent(yearNo, monthNo, dayNo, id) {
        const day = CalendarEventStore.getDay(yearNo, monthNo, dayNo);
        if (!day.has(+id)) throw new Error("No events");
        return day.get(+id);
    },
    addEvent(e) {
        const [year, month, day] = e.date.split('.');
        if (!eventDateMap.has(year)) CalendarEventStore.addYear(year);

        const monthStore = eventDateMap.get(year)[+month];
        if (!monthStore[+day]) monthStore[+day] = new dayMap();

        const dayStore = monthStore[+day];
        const id = dayStore.id;
        dayStore.set(id, e);
        return id
    }
};
