import YearViewStrategy from "../Strategy/YearViewStrategy.js";
import CalendarEventView from "./CalendarEventView.js";
import StateView from "./StateView.js";

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

export default class YearView extends StateView {
    static viewStrategy = new YearViewStrategy();

    constructor() {
        super();
    }

    render(data, start) {
        if (!data) return;
        let out = [];
        this.component = document.createElement('main');
        this.component.textContent = start[0];
        for (let k = 0; k < data.length; k++) {
            let days = [];
            const month = document.createElement('div');
            const h5 = document.createElement('h5');
            h5.textContent = monthNames[k];
            const dayGroup = document.createElement('section');
            for (let i = 0; i < data[k].length; i++) {
                const group = document.createElement('div');
                const h6 = document.createElement('h6');
                h6.textContent = i + 1;
                const section = document.createElement('section');
                let events = [];
                if (data[k][i]) {
                    for (const entry of data[k][i].heap) {
                        const cv = new CalendarEventView();
                        cv.render(entry, YearView.viewStrategy);
                        cv.component.classList.add('circle');
                        events.push(cv.component);
                    }
                }
                section.replaceChildren(...events);
                group.replaceChildren(h6, section);
                days.push(group);
            }
            dayGroup.replaceChildren(...days);
            month.replaceChildren(h5, dayGroup);
            out.push(month);
        }
        this.component.classList.add('year');
        this.component.replaceChildren(...out);
        super.render();
        document.querySelector('body').replaceChild(this.component, document.querySelector('body').lastElementChild);
    }
}