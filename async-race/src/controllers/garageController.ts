import GaragePage from '../view/garage/garagePage';
import Garage from '../API/garage';
import state from '../app/appData/state';

class GarageController {
    private garagePage: GaragePage;

    private garage: Garage;

    constructor() {
        this.garagePage = new GaragePage();
        this.garage = new Garage();
    }

    async start() {
        const carsData = await this.garage.getCarsData(state.garagePage);
        this.garagePage.renderCarsTitle(carsData.total);
        this.garagePage.render(state.garagePage, carsData.cars);
    }
}

export default GarageController;
