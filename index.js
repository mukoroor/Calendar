import CalendarEvent from "./src/CalendarEvent.js";
import { CalendarEventStore } from "./src/CalendarEventStore.js";
import CalendarEventView from "./src/View/CalendarEventView.js";
import { stateController, stateIteratorController } from "./src/Controller.js";

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

function getRandomHexColor() {
    // Generate a random hexadecimal color code
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// Generate random events for September, October, and November
let year = 2021;
for (year; year < 2024; year++) {
for (let month = 1; month <= 12; month++) {
    for (let i = 0; i < 300; i++) { // Generate 100 events for each month
        const date = getRandomDate(year, month);
        const time = getRandomTime();
        const name = Math.floor(Math.random() * 300000000).toString(36);
        const color = getRandomHexColor();
        const event = { date, time, name, color };
        new CalendarEvent(event);
    }
}
}

document.querySelector('body').append(stateController.view.component);
document.querySelector('body').append(stateIteratorController.view.component);


