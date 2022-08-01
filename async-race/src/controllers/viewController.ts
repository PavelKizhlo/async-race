import state from '../app/appData/state';
import GarageView from '../view/garage/garageView';
import GarageController from './garageController';
import WinnersView from '../view/winners/winnersView';

class ViewController {
    private garageView: GarageView;

    private garageController: GarageController;

    private winnersView: WinnersView;

    constructor() {
        this.garageView = new GarageView();
        this.garageController = new GarageController();
        this.winnersView = new WinnersView();
    }

    async start() {
        switch (state.view) {
            case 'winners':
                this.winnersView.render();
                break;
            case 'garage':
            default:
                this.garageView.render();
                await this.garageController.start();
                break;
        }
    }
}

export default ViewController;
