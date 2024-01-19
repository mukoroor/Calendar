const MonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DaysShort = [
    "U", "M", "T", "W", "R", "F", "S"
];

const DaysMed = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

const DaysFull = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const MonthLengths = Array.from({length: 12}, (_, i) => new Date(0, i + 1, 0).getDate());


export {MonthNames, DaysShort, DaysMed, DaysFull, MonthLengths};