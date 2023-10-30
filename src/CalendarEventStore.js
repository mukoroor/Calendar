// Maps => Year => Array of Month which stores Array of Days which stores Array of Events
const eventDateMap = new Map();


const CalendarEventStore = {
    getYear(yearNo) {
        if (!eventDateMap.has(yearNo)) throw new Error("No events");
        return eventDateMap.get()
    },
    getMonth(yearNo, monthNo) {
        const year = CalendarEventStore.getYear(yearNo);
        if (!year[monthNo]) throw new Error("No events");
        return year[monthNo];
    },
    getDay(yearNo, monthNo, dayNo) {
        const month = CalendarEventStore.getMonth(yearNo, monthNo);
        if (!month[dayNo]) throw new Error("No events");
        return month[dayNo];
    }
};

export default CalendarEventStore;