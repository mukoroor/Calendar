import ViewStrategy from "./ViewStrategy.js";

export default class YearViewStrategy extends ViewStrategy {
    constructor() {
        super();
    }

    renderEvent(data) {
        const div = document.createElement('div');
        div.style.setProperty('--col', data.color);
        div.classList.add('stg')
        return div;
    }

}