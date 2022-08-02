import state from '../app/appData/state';
import GarageView from '../view/garage/garageView';
import GarageController from './garageController';
import WinnersView from '../view/winners/winnersView';
import WinnersController from './winnersController';

class ViewController {
    private garageView: GarageView;

    private garageController: GarageController;

    private winnersView: WinnersView;

    private winnerController: WinnersController;

    constructor() {
        this.garageView = new GarageView();
        this.garageController = new GarageController();
        this.winnersView = new WinnersView();
        this.winnerController = new WinnersController();
    }

    async start() {
        switch (state.view) {
            case 'winners':
                this.winnersView.render();
                await this.winnerController.start();
                break;
            case 'garage':
            default:
                this.garageView.render();
                await this.garageController.start();
                break;
        }

        const garageButton = document.getElementById('to-garage') as HTMLButtonElement;
        const winnersButton = document.getElementById('to-winners') as HTMLButtonElement;

        garageButton.addEventListener('click', async () => {
            if (state.view !== 'garage') {
                state.view = 'garage';
                this.garageView.render();
                await this.garageController.start();
            }
        });

        winnersButton.addEventListener('click', async () => {
            if (state.view !== 'winners') {
                state.view = 'winners';
                this.winnersView.render();
                await this.winnerController.start();
            }
        });
    }
}

export default ViewController;
