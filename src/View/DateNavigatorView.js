import View from "./View.js";
import { dayNavigatorController as DNC } from "../Controller.js";
import { MonthNames } from "../Model/DateMappings.js";

export default class DateNavigatorView extends View {
    constructor() {
        super();
    }

    select() {
        this.component?.classList.toggle('select');
    }

    render(data) {
        const self = this;
        this.component ??= document.createElement('div');

        let oldIndex = data.getMonth();

        const navigatorViews = {month: 'month-name', date:'date-no', year: 'year-no'};

        for (const [key, className] of Object.entries(navigatorViews)) {
            let textContent, span;
            if (key[0] === 'm') {
                textContent = MonthNames[oldIndex];
                span = this.#createSpan(textContent, className);
                span.dataset.monthIndex = oldIndex;
            } else {
                textContent = key[0] === 'd' ? data.getDate() : data.getFullYear();
                span = this.#createSpan(textContent, className);
            }

            span.tabIndex = 0;
            span.dataset.editable = false;

            span.addEventListener('mouseover', () => {
                span.focus({ focusVisible: true });
            });

            span.addEventListener('keydown', e => {
                if (e.key === 'ArrowUp') {
                    self.#handleArrowKey(navigatorViews, 'up', key[0]);
                } else if (e.key === 'ArrowDown') {
                    self.#handleArrowKey(navigatorViews, 'down', key[0]);
                } else if (span.dataset.editable) {
                
                    if (+e.key >= 0 && +e.key < 10) {
                        span.textContent += e.key;
                    } else if (e.key == 'Backspace' && span.textContent) {
                        span.textContent = span.textContent.slice(0, span.textContent.length - 1);
                    } else if (e.key == 'Enter') {
                        //error checking needed;
                        span.dataset.editable = false;
                        self.#updateDate(navigatorViews);
                    }
                
                }
            });

            if (key[0] != 'm') span.addEventListener('dblclick', () => {
                span.dataset.editable = true;
            });
        
            navigatorViews[key] = span;
        }

        const title = document.createElement('div');
        title.append(...Object.values(navigatorViews));

        const navButtons = document.createElement('div');
        ['previous', 'next'].forEach(e => {
            const button = document.createElement('button');
            button.textContent = e;
            button.onclick = () => {
                e === 'next' ? DNC.next() : DNC.previous();
            };
            navButtons.append(button);
        });

        this.component.replaceChildren(title, navButtons);
    }

    #handleArrowKey(views, direction, key) {
        if (direction === 'up') {
            this.#updateDate(views, -1, key);
        } else if (direction === 'down') {
            this.#updateDate(views, 1, key);
        }
    };

    #createSpan(textContent, className) {
        const span = document.createElement('span');
        span.textContent = textContent;
        span.classList.add(className);
        return span;
    };

    #updateDate({month, date, year}, amount = 0, key = '') {
        let newMonth = +month.dataset.monthIndex;
        let newDate = +date.textContent;
        let newYear = +year.textContent;

        if (key === 'm') {
            newMonth = (newMonth + amount + 12) % 12;
            month.textContent = MonthNames[newMonth];
        } else if (key === 'd') {
            const dayLen = new Date(newYear, (newMonth + 1) % 12, 0).getDate();
            newDate = newDate === (amount > 0 ? dayLen : 1) ? (amount > 0 ? 1: dayLen) : newDate + amount;
        } else if (key === 'y') {
            newYear += amount;
        }

        DNC.updateModel(new Date(newYear, newMonth, newDate));
    };
}
