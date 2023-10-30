import CalendarEventStore from "./CalendarEventStore.js";

const calendarEventController = {
    selected: new Set(),

    toggleEvent(hash) {
        const lookupParams = hash.split('.');
        const event = CalendarEventStore.getEvent(...lookupParams);
        if (this.selected.has(event)) this.selected.delete(event);
        else this.selected.add(event);
    }
};

export default calendarEventController;