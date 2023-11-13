import ViewStrategy from "./ViewStrategy.js";

export default class DayViewStrategy extends ViewStrategy {
    constructor() {
        super();
    }

    render(data) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        const p = document.createElement('p');
        div.style.setProperty('--col', data.color);
        div.replaceChildren(p, span);
        // div.addEventListener("click", this.select.bind(this));
        div.classList.add('stg')
        span.textContent = data.time;
        p.textContent = data.name;
        return div;
    }

}