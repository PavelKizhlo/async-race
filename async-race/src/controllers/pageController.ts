import GarageView from '../view/garage/garageView';

class PageController {
    private garageView: GarageView;

    constructor() {
        this.garageView = new GarageView();
    }

    start() {
        this.garageView.render();
    }
}

export default PageController;
