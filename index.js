import CalendarEvent from "./src/Model/CalendarEvent.js";
// have to fix setup issues.
import { stateController, dayNavigatorController } from "./src/Controller.js";
import stateManager from "./src/Manager.js";

function getRandomDate(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    return new Date(year, month - 1, day);
}

function setRandomTime(date) {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
}

function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let year = 2000;
for (year; year <= 2030; year++) {
    for (let month = 1; month <= 12; month++) {
        for (let i = 0; i < 100; i++) {
            const startTime = setRandomTime(getRandomDate(year, month));
            let endTime = setRandomTime(new Date(startTime));
            if (endTime <= startTime) continue;
            const name = Math.floor(Math.random() * 300000000).toString(36);
            const color = getRandomHexColor();
            const event = { startTime, endTime, name, color };
            new CalendarEvent(event);
        }
    }
}



function load() {
    stateManager.notify();
    document.removeEventListener("DOMContentLoaded", load);
}

document.addEventListener("DOMContentLoaded", load);
