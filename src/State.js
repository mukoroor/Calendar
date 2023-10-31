import CalendarEvent from "./CalendarEvent.js";
import CalendarEventView from "./CalendarEventView.js";

const event = new CalendarEvent({date: "2023.09.30", time: "11:00", name: "test"});
const view = new CalendarEventView(event);

document.querySelector("body").append(view.component)
