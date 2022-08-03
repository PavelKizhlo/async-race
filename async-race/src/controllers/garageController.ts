import GaragePage from '../view/garage/garagePage';
import Garage from '../API/garage';
import Winners from '../API/winners';
import state from '../app/appData/state';
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
        await this.updatePage();

        view.addEventListener('click', async (evt) => {
            const elementID = (evt.target as HTMLElement).id;

            switch (true) {
                case elementID === 'create-button':
                    await this.addNewCar();
                    break;
                case elementID.includes('remove-button'):
                    await this.removeCar(parseInt((elementID.match(/[0-9]+$/) as RegExpMatchArray)[0], 10));
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

    async updatePage() {
        const carsData = await this.garage.getCarsData(state.garagePage);
        this.garagePage.renderCarsTitle(carsData.total);
        this.garagePage.render(state.garagePage, carsData.cars);
    }

    async addNewCar() {
        const carNameInput = document.getElementById('create-name-input') as HTMLInputElement;
        const carColorInput = document.getElementById('create-color-input') as HTMLInputElement;

        if (carNameInput.value) {
            await this.garage.createCar({ name: carNameInput.value, color: carColorInput.value });
            carNameInput.value = '';
        }

        await this.updatePage();
    }

    async removeCar(id: number) {
        await this.garage.deleteCar(id);
        await this.winners.deleteWinner(id);

        await this.updatePage();
    }

    changeCar() {
        const carNameInput = document.getElementById('update-name-input') as HTMLInputElement;
        const carColorInput = document.getElementById('update-color-input') as HTMLInputElement;
        const updateButton = document.getElementById('update-button') as HTMLButtonElement;

        updateButton.addEventListener('click', async () => {
            const selectedCar = document.querySelector('.button_active') as HTMLButtonElement;

            if (selectedCar) {
                const id = parseInt((selectedCar.id.match(/[0-9]+$/) as RegExpMatchArray)[0], 10);
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

        await this.updatePage();
    }
}

export default GarageController;
