import GarageView from '../view/garage/garageView';

class ViewController {
    private garageView: GarageView;

    constructor() {
        this.garageView = new GarageView();
    }

    start() {
        this.garageView.render();
    }
}

export default ViewController;
