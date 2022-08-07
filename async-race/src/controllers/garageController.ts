import GaragePage from '../view/garage/garagePage';
import Garage from '../API/garage';
import Winners from '../API/winners';
import state from '../app/appData/state';
import constants from '../app/appData/constants';
import getRandomCars from '../app/appData/utils';
import RaceController from './raceController';

class GarageController {
    private garagePage: GaragePage;

    private raceController: RaceController;

    private garage: Garage;

    private winners: Winners;

    constructor() {
        this.garagePage = new GaragePage();
        this.raceController = new RaceController();
        this.garage = new Garage();
        this.winners = new Winners();
    }

    async start() {
        const view = document.getElementById('garage-view') as HTMLDivElement;
        await this.loadPage();
        this.selectCar();
        this.saveInputs();
        this.raceController.start();

        view.addEventListener('click', async (evt) => {
            const elementID = (evt.target as HTMLElement).id;

            switch (true) {
                case elementID === 'create-button':
                    await this.addNewCar();
                    break;
                case elementID.includes('remove-button'):
                    await this.removeCar(elementID);
                    break;
                case elementID === 'update-button':
                    await this.changeCar();
                    break;
                case elementID === 'generate-button':
                    await this.createRandomCars();
                    break;
                case elementID.includes('pagination'):
                    await this.paginate(elementID);
                    break;
                default:
                    break;
            }
        });
    }

    async loadPage() {
        const carsData = await this.garage.getCarsData(state.garagePage);
        const raceWinner = document.getElementById('race-winner') as HTMLDivElement;

        raceWinner.classList.remove('race-winner_active');
        state.carsInGarage = carsData.total;
        state.pagesInGarage = Math.ceil(state.carsInGarage / constants.carsPerPage);

        this.garagePage.renderCarsTitle(carsData.total);
        this.garagePage.render(state.garagePage, carsData.cars);

        const buttonNext = document.getElementById('pagination-next') as HTMLButtonElement;
        if (state.garagePage < state.pagesInGarage) {
            buttonNext.disabled = false;
        }
    }

    async addNewCar() {
        const carNameInput = document.getElementById('create-name-input') as HTMLInputElement;
        const carColorInput = document.getElementById('create-color-input') as HTMLInputElement;

        if (carNameInput.value) {
            await this.garage.createCar({ name: carNameInput.value, color: carColorInput.value });
            carNameInput.value = '';
            state.createCarInput = '';
        }

        await this.loadPage();
    }

    async removeCar(elementID: string) {
        const id = parseInt((elementID.match(/[0-9]+$/) as RegExpMatchArray)[0], 10);
        await this.garage.deleteCar(id);
        await this.winners.deleteWinner(id);

        await this.loadPage();
    }

    selectCar() {
        const view = document.getElementById('garage-view') as HTMLDivElement;
        const carNameInput = document.getElementById('update-name-input') as HTMLInputElement;

        view.addEventListener('click', (evt) => {
            const target = evt.target as HTMLElement;
            if (target.id.includes('select-button')) {
                if (target.classList.contains('button_active')) {
                    target.classList.remove('button_active');
                    carNameInput.value = '';
                } else {
                    document.querySelector('.button_active')?.classList.remove('button_active');
                    target.classList.add('button_active');
                    const id = parseInt((target.id.match(/[0-9]+$/) as RegExpMatchArray)[0], 10);
                    const prevName = (document.getElementById(`car-name-${id}`) as HTMLSpanElement).innerHTML;
                    carNameInput.value = prevName;
                }
            }
        });
    }

    saveInputs() {
        const view = document.getElementById('garage-view') as HTMLDivElement;

        view.addEventListener('input', (evt) => {
            const { value } = evt.target as HTMLInputElement;
            const { id } = evt.target as HTMLInputElement;

            switch (true) {
                case id === 'create-name-input':
                    state.createCarInput = value;
                    break;
                case id === 'create-color-input':
                    state.createColorInput = value;
                    break;
                case id === 'update-name-input':
                    state.updateCarInput = value;
                    break;
                case id === 'update-color-input':
                    state.updateColorInput = value;
                    break;
                default:
                    break;
            }
        });
    }

    async changeCar() {
        const carNameInput = document.getElementById('update-name-input') as HTMLInputElement;
        const carColorInput = document.getElementById('update-color-input') as HTMLInputElement;
        const selectedCar = document.querySelector('.button_active') as HTMLButtonElement;

        if (selectedCar) {
            const id = parseInt((selectedCar.id.match(/[0-9]+$/) as RegExpMatchArray)[0], 10);
            const prevName = (document.getElementById(`car-name-${id}`) as HTMLSpanElement).innerHTML;
            await this.garage.updateCar(id, {
                name: carNameInput.value ? carNameInput.value : prevName,
                color: carColorInput.value,
            });
            carNameInput.value = '';
            state.updateCarInput = '';
        }

        await this.loadPage();
    }

    async createRandomCars() {
        const randomCarsData = getRandomCars();
        await Promise.allSettled(
            randomCarsData.map(async (carData) => {
                await this.garage.createCar(carData);
            })
        );

        await this.loadPage();
    }

    async paginate(buttonID: string) {
        const buttonPrev = document.getElementById('pagination-prev') as HTMLButtonElement;
        const buttonNext = document.getElementById('pagination-next') as HTMLButtonElement;
        const raceButton = document.getElementById('race-button') as HTMLButtonElement;

        raceButton.disabled = false;

        switch (buttonID) {
            case 'pagination-prev':
                if (state.garagePage >= 2) {
                    state.garagePage -= 1;
                    buttonNext.disabled = false;
                    await this.loadPage();
                }
                if (state.garagePage <= 1) {
                    buttonPrev.disabled = true;
                }
                break;
            case 'pagination-next':
                if (state.garagePage < state.pagesInGarage) {
                    state.garagePage += 1;
                    buttonPrev.disabled = false;
                    await this.loadPage();
                }

                if (state.garagePage >= state.pagesInGarage) {
                    buttonNext.disabled = true;
                }
                break;
            default:
                break;
        }
    }
}

export default GarageController;
