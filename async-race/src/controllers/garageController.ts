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
            const elementID = (evt.target as HTMLElement).id;

            switch (true) {
                case elementID === 'create-button':
                    await this.addNewCar();
                    break;
                case elementID.includes('remove-button'):
                    await this.removeCar(+elementID.slice(-1));
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

    async removeCar(id: number) {
        await this.garage.deleteCar(id);

        const carsData = await this.garage.getCarsData(state.garagePage);
        this.garagePage.renderCarsTitle(carsData.total);
        this.garagePage.render(state.garagePage, carsData.cars);
    }
}

export default GarageController;
