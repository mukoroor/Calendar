import View from "./View.js";
import { dayNavigatorController as DNC} from "../Controller.js";

export default class TimeRangeView extends View {
    static viewStrategy;

    constructor() {
        super();
    }

    render(data, start) {
        this.component.classList.add('view');
    }
    
    changeDate(year, month, date) {
        const dateObj = new Date(year, month, date);
        DNC.model.setCurrentDay(dateObj);
        DNC.updateView();
    }
}