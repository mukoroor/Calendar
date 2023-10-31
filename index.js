import CalendarEvent from "./src/CalendarEvent.js";
import { CalendarEventStore } from "./src/CalendarEventStore.js";
import CalendarEventView from "./src/CalendarEventView.js";
import { viewStateController } from "./src/Controller.js";

function getRandomDate(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Function to generate a random time
function getRandomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Generate random events for September, October, and November
const year = 2023;

for (let month = 9; month <= 11; month++) {
    for (let i = 0; i < 100; i++) { // Generate 100 events for each month
        const date = getRandomDate(year, month);
        const time = getRandomTime();
        const name = Math.floor(Math.random() * 300000).toString(36);
        const event = { date, time, name };
        new CalendarEvent(event);
    }
}

viewStateController.updateState(1);

setTimeout(() => {
    viewStateController.next();
}, 5000);
