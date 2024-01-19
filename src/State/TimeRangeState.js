import PriorityQueue from "../Model/PriorityQueue.js";

export default class TimeRangeState {

    constructor() {
    }

    next() {
        throw new Error("must implement");
    }

    previous() {
        throw new Error("must implement");
    }

    generateData() {
        throw new Error("must implement");
    }

    eventsToTimeline(events, mode) {
        const timelineArr = [];
        
        if (mode == 'overlap') {
            timelineArr = events.inOrder();
        } else {
            // adapted from leetcode meeting rooms 3 understanding
            let timeLineCount = 1;

            const ranges = events.duplicate();
            const occupied = new PriorityQueue((a , b) => {
                return (a[0].endTime- b[0].endTime ||
                        a[1] - b[1]);
            })
            const rooms = new PriorityQueue((a, b) => a - b);

            while (ranges.size || occupied.size) {
                let event = ranges.dequeue();
                while (occupied.size && (!event || occupied.peek()[0].endTime < event.startTime)) {
                    const finishedMeeting = occupied.dequeue();
                    finishedMeeting[0].col = finishedMeeting[1];
                    timelineArr.push(finishedMeeting[0]);
                    rooms.enqueue(finishedMeeting[1]);
                }

                if (event) {
                    let room = rooms.size ? rooms.dequeue() : timeLineCount++;
                    occupied.enqueue([event, room]);
                }
            }
        }
        return timelineArr;
    }

    static dateToYMD(date) {
        return date.toLocaleDateString('zh-CN').split('/').map((e, i) => i == 1 ? +e - 1: +e); 
    }

    // from https://stackoverflow.com/questions/67341661/how-to-get-only-the-timezone-name-in-javascript with some slight channges
    static getTimeZoneName(type, locales = []) {
        return new Intl.DateTimeFormat(locales, { timeZoneName: type })
         .formatToParts(new Date())
         .find(part => part.type == "timeZoneName")
         .value
    }
}