import StateView from "./StateView.js";
import CalendarEventView from "./CalendarEventView.js";
import MonthViewStrategy from "../Strategy/MonthViewStrategy.js"

export default class MonthView extends StateView {
    static viewStrategy = new MonthViewStrategy();

    constructor() {
        super();
    }
    
    render(data, start) {
        if (!data) return;
        let out = [];
        this.component = document.createElement('main');
        this.component.textContent = start[0];

        for (let i = 0; i < data.length; i++) {
            const dayComponent = document.createElement('div');
            const section = document.createElement('section');
            const header = document.createElement('h4');
            header.textContent = i + 1;

            const cVStore = data[i]?.heap.map((entry) => {
                const cv = new CalendarEventView(MonthView.viewStrategy); //box?
                cv.render(entry);
                cv.component.classList.add('box');
                return cv.component;
            });

            if (cVStore) section.replaceChildren(...cVStore);
            dayComponent.replaceChildren(header, section);
            out.push(dayComponent);
        }
        this.component.classList.add('month');
        this.component.replaceChildren(...out);
        super.render();
        document.querySelector('body').replaceChild(this.component, document.querySelector('body').lastElementChild);
    }
}