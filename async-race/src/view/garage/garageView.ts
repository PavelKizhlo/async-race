import html from './garageViewHTML';
import state from '../../app/appData/state';

class GarageView {
    render() {
        const view = document.getElementById('view') as HTMLDivElement;
        view.innerHTML = html;

        const buttonPrev = document.getElementById('pagination-prev') as HTMLButtonElement;
        const buttonNext = document.getElementById('pagination-next') as HTMLButtonElement;

        if (state.garagePage <= 1) buttonPrev.disabled = true;
        if (state.garagePage >= state.pagesInGarage) buttonNext.disabled = true;

        const createNameInput = document.getElementById('create-name-input') as HTMLInputElement;
        const createColorInput = document.getElementById('create-color-input') as HTMLInputElement;
        const updateNameInput = document.getElementById('update-name-input') as HTMLInputElement;
        const updateColorInput = document.getElementById('update-color-input') as HTMLInputElement;

        createNameInput.value = state.createCarInput;
        createColorInput.value = state.createColorInput;
        updateNameInput.value = state.updateCarInput;
        updateColorInput.value = state.updateColorInput;
    }
}

export default GarageView;
