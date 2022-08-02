import GaragePage from '../view/garage/garagePage';
import Garage from '../API/garage';
import Winners from '../API/winners';
import state from '../app/appData/state';
import constants from '../app/appData/constants';
import getRandomCars from '../app/appData/utils';

class GarageController {
    private garagePage: GaragePage;

    private garage: Garage;

    private winners: Winners;

    constructor() {
        this.garagePage = new GaragePage();
        this.garage = new Garage();
        this.winners = new Winners();
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
                case elementID.includes('select-button'):
                    if ((evt.target as HTMLElement).classList.contains('button_active')) {
                        (evt.target as HTMLElement).classList.remove('button_active');
                    } else {
                        document.querySelector('.button_active')?.classList.remove('button_active');
                        (evt.target as HTMLElement).classList.add('button_active');
                    }
                    this.changeCar();
                    break;
                case elementID === 'generate-button':
                    await this.createRandomCars();
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
        await this.winners.deleteWinner(id);

        const carsData = await this.garage.getCarsData(state.garagePage);
        this.garagePage.renderCarsTitle(carsData.total);
        this.garagePage.render(state.garagePage, carsData.cars);
    }

    changeCar() {
        const carNameInput = document.getElementById('update-name-input') as HTMLInputElement;
        const carColorInput = document.getElementById('update-color-input') as HTMLInputElement;
        const updateButton = document.getElementById('update-button') as HTMLButtonElement;

        updateButton.addEventListener('click', async () => {
            const selectedCar = document.querySelector('.button_active');

            if (selectedCar) {
                const id = +selectedCar.id.slice(-1);
                const prevName = (document.getElementById(`car-name-${id}`) as HTMLSpanElement).innerHTML;
                await this.garage.updateCar(id, {
                    name: carNameInput.value ? carNameInput.value : prevName,
                    color: carColorInput.value,
                });
                carNameInput.value = '';
            }

            const carsData = await this.garage.getCarsData(state.garagePage);
            this.garagePage.render(state.garagePage, carsData.cars);
        });
    }

    async createRandomCars() {
        const randomCarsData = getRandomCars();
        await Promise.allSettled(
            randomCarsData.map(async (carData) => {
                await this.garage.createCar(carData);
            })
        );

        const carsData = await this.garage.getCarsData(state.garagePage);
        this.garagePage.renderCarsTitle(carsData.total);

        if (state.garagePage >= Math.floor(carsData.total / constants.carsPerPage)) {
            this.garagePage.render(state.garagePage, carsData.cars);
        }
    }
}

export default GarageController;
