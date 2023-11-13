import StateView from "./StateView.js";
import CalendarEventView from "./CalendarEventView.js";
import WeekViewStrategy from "../Strategy/WeekViewStrategy.js";

export default class WeekView extends StateView {
    static viewStrategy = new WeekViewStrategy();

    constructor() {
        super();
    }

    render(data, start) {
        if (!data) return;
        let out = [];
        this.component = document.createElement('main');
        for (let i = 0; i < data.length; i++) {
            const dayComponent = document.createElement('div');
            const section = document.createElement('section');
            const header = document.createElement('h4');

            header.textContent = `${start[i][1]} - ${start[i][2]}`;
            const cVStore = data[i]?.heap.map((entry) => {
                const cv = new CalendarEventView();
                cv.render(entry, WeekView.viewStrategy);
                return cv.component;
            });
            
            if (cVStore) section.replaceChildren(...cVStore);
            dayComponent.replaceChildren(header, section);
            out.push(dayComponent);
        }
        this.component.classList.add('week');
        this.component.replaceChildren(...out);
        super.render();
        document.querySelector('body').replaceChild(this.component, document.querySelector('body').lastElementChild);
    }
}