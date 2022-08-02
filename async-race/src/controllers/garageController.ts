import GaragePage from '../view/garage/garagePage';
import Garage from '../API/garage';
import state from '../app/appData/state';
import constants from '../app/appData/constants';

class GarageController {
    private garagePage: GaragePage;

    private garage: Garage;

    constructor() {
        this.garagePage = new GaragePage();
        this.garage = new Garage();
    }

    async start() {
        const view = document.getElementById('view') as HTMLDivElement;
        const carsData = await this.garage.getCarsData(state.garagePage);
        this.garagePage.renderCarsTitle(carsData.total);
        this.garagePage.render(state.garagePage, carsData.cars);

        view.addEventListener('click', async (evt) => {
            switch ((evt.target as HTMLElement).id) {
                case 'create-button':
                    await this.addNewCar();
                    break;
                default:
                    break;
            }
        });
    }

    async addNewCar() {
        const carNameInput = document.getElementById('create-name-input') as HTMLInputElement;
        const carColorInput = document.getElementById('create-color-input') as HTMLInputElement;

        if (carNameInput.value) {
            await this.garage.createCar({ name: carNameInput.value, color: carColorInput.value });
        }

        const carsData = await this.garage.getCarsData(state.garagePage);
        this.garagePage.renderCarsTitle(carsData.total);

        if (state.garagePage >= Math.floor(carsData.total / constants.carsPerPage)) {
            this.garagePage.render(state.garagePage, carsData.cars);
        }
    }
}

export default GarageController;
