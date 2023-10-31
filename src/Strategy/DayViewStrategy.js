import ViewStrategy from "./ViewStrategy.js";

export default class DayViewStrategy extends ViewStrategy {
    constructor() {
        super();
    }

    render(data) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        const p = document.createElement('p');
        div.replaceChildren(span, p);
        // div.addEventListener("click", this.select.bind(this));
        span.textContent = data.time;
        p.textContent = data.name;
        return div;
    }

}