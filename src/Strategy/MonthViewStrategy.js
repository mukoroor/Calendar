import ViewStrategy from "./ViewStrategy.js";

export default class MonthViewStrategy extends ViewStrategy {
    constructor() {
        super();
    }

    render(data) {
        // const div = document.createElement('div');
        const span = document.createElement('span');
        span.style.setProperty('--col', data.color);
        span.classList.add('stg')
        // div.append(span);
        // div.addEventListener("click", this.select.bind(this));
        // span.textContent = data.name;
        return span;
    }

}